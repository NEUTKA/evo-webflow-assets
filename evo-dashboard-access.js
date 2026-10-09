/* Shared authorization for dashboard apps. No app may start from a role flag alone. */
(function () {
  if (window.EvoDashboardAccess) return;
  let pending = null, checkedAt = 0, latest = null, inFlight=false;
  const rolesHome = {teacher:'/teacher-dashboard',student:'/student-dashboard',self_study:'/personal-account'};
  const dashboardPage = /^\/(student-dashboard|teacher-dashboard)(\/|$)/.test(location.pathname);
  if (dashboardPage) {
    document.documentElement.setAttribute('data-evo-access-pending','');
    const style=document.createElement('style');style.id='evo-dashboard-access-hide';
    style.textContent='html[data-evo-access-pending] #teacher-dashboard-app,html[data-evo-access-pending] #student-dashboard-app,html[data-evo-access-pending] #teacher-live-shell,html[data-evo-access-pending] #student-live-shell{visibility:hidden!important}';
    (document.head||document.documentElement).appendChild(style);
  }
  function fail(error) {
    if (error?.redirecting || !dashboardPage) return;
    let box=document.getElementById('evo-dashboard-verification-error');
    if (!box) {
      box=document.createElement('div');box.id='evo-dashboard-verification-error';box.setAttribute('role','alert');
      box.style.cssText='position:fixed;inset:0;z-index:2147483647;background:#fff;display:flex;align-items:center;justify-content:center;padding:24px;font:16px/1.6 Arial,sans-serif';
      const content=document.createElement('div');content.style.maxWidth='500px';
      const title=document.createElement('h2');title.textContent='We could not verify your access';
      const message=document.createElement('p');message.textContent='Please try again. For help, contact evoenglish@outlook.com.';
      const retry=document.createElement('button');retry.textContent='Try again';retry.onclick=()=>location.reload();
      const billing=document.createElement('a');billing.href='/billing';billing.textContent='Manage subscription';billing.style.marginLeft='16px';
      content.append(title,message,retry,billing);box.appendChild(content);(document.body||document.documentElement).appendChild(box);
    }
  }
  function redirect(url) {
    window.__evoAllowTeacherApp=false;window.__evoAllowStudentApp=false;
    window.dispatchEvent(new CustomEvent('evo:access-denied'));
    if (location.pathname+location.search!==url) location.replace(url);
    const error=new Error('Access unavailable');error.redirecting=true;throw error;
  }
  async function client() {
    const started=Date.now();
    while (Date.now()-started<15000) {
      const sb=window.supabaseClient||window.supabase;
      if(sb?.auth&&sb?.rpc)return sb;
      await new Promise(resolve=>setTimeout(resolve,100));
    }
    throw new Error('Sign-in service unavailable');
  }
  async function verify() {
    const sb=await client();
    const {data:userData,error:userError}=await sb.auth.getUser();
    if(userError)throw new Error('Sign-in verification unavailable');
    if(!userData?.user)redirect('/login?next='+encodeURIComponent(location.pathname));
    const {data:access,error}=await sb.rpc('evo_get_access_status');
    if(error||!access)throw new Error('Access verification unavailable');
    if(!access.ok) {
      if(access.reason==='email_unconfirmed')redirect('/login?confirm_email=1');
      if(access.reason==='profile_not_ready')redirect('/welcome');
      redirect('/login');
    }
    latest=access;window.__evoCurrentAccess=access;checkedAt=Date.now();
    if(!access.has_access) {
      if(access.payment_required)redirect('/pricing?reason='+encodeURIComponent(access.reason));
      throw new Error('Access verification unavailable');
    }
    return access;
  }
  async function ensure(roles,force=false) {
    try {
      if(!pending||(!inFlight&&(force||Date.now()-checkedAt>60000))) {
        inFlight=true;
        pending=verify().catch(error=>{pending=null;fail(error);throw error;}).finally(()=>{inFlight=false;});
      }
      const access=await pending;
      if(roles?.length&&!roles.includes(access.role))redirect(rolesHome[access.role]||'/welcome');
      document.documentElement.removeAttribute('data-evo-access-pending');
      document.getElementById('evo-dashboard-verification-error')?.remove();
      return access;
    } catch(error) {fail(error);throw error;}
  }
  window.EvoDashboardAccess={ensure,fail,get current(){return latest;}};
  if(dashboardPage) {
    setInterval(()=>{if(!document.hidden)ensure(null,true).catch(()=>{});},60000);
    window.addEventListener('focus',()=>ensure(null,true).catch(()=>{}));
  }
})();
