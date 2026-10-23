/* Compact version of the supplied Voice Coach hologram. Three.js is lazy loaded. */
(function (global) {
  'use strict';
  global.EvoLessonOrb = async function (mount, readState) {
    const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(40, 1, .1, 100);
    camera.position.z = 7.3;
    const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true, powerPreference:'low-power'});
    renderer.setClearColor(0, 0); renderer.setPixelRatio(Math.min(global.devicePixelRatio || 1, 1.5));
    renderer.domElement.setAttribute('aria-hidden', 'true');
    mount.append(renderer.domElement); mount.dataset.rendered = 'true';
    const group = new THREE.Group(); scene.add(group);
    const resources = [], points = [];
    function cloud(count, radius, shell, color, size, opacity) {
      const base = new Float32Array(count * 3), live = new Float32Array(count * 3), phases = new Float32Array(count);
      for (let i=0;i<count;i++) {
        const theta = Math.acos(2*Math.random()-1), phi = Math.random()*Math.PI*2;
        const r = shell ? radius + Math.random()*.14 : Math.cbrt(Math.random()) * radius;
        base.set([Math.sin(theta)*Math.cos(phi)*r,Math.cos(theta)*r,Math.sin(theta)*Math.sin(phi)*r],i*3);
        phases[i] = Math.random()*Math.PI*2;
      }
      live.set(base);
      const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position',new THREE.BufferAttribute(live,3));
      const material = new THREE.PointsMaterial({color,size,transparent:true,opacity,depthWrite:false,blending:THREE.AdditiveBlending});
      group.add(new THREE.Points(geometry,material)); resources.push(geometry,material);points.push({base,phases,geometry,shell,material,opacity});
    }
    cloud(1100,.92,false,0x91f1ff,.04,.88); cloud(320,1.33,true,0x6ee7ff,.025,.28);
    const rings = [[1.72,.18,0],[2.05,-.56,.32],[2.34,1.06,-.23]].map(([r,x,z])=>{
      const array = new Float32Array(100*3);
      for(let i=0;i<100;i++) {const a=i/100*Math.PI*2;array.set([Math.cos(a)*r,0,Math.sin(a)*r],i*3);}
      const geo = new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(array,3));
      const mat = new THREE.PointsMaterial({color:0x8dedff,size:.023,transparent:true,opacity:.35,depthWrite:false,blending:THREE.AdditiveBlending});
      const ring=new THREE.Points(geo,mat);ring.rotation.x=x;ring.rotation.z=z;group.add(ring);resources.push(geo,mat);return ring;
    });
    let alive = true, frame = 0, last = 0;
    const reduced = global.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    function resize() {
      const bounds=mount.getBoundingClientRect();const w=Math.max(1,bounds.width),h=Math.max(1,bounds.height);
      camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);
    }
    const observer = new ResizeObserver(resize);observer.observe(mount);resize();
    function draw(ms) {
      if(!alive)return;
      frame=requestAnimationFrame(draw);
      if(document.hidden || ms-last < (reduced?350:40))return;
      last=ms;const t=reduced?0:ms/1000,{mode='idle',user=0,ai=0}=readState();
      const active=mode==='speaking'?ai:mode==='listening'?user:0;
      for(const p of points){
        const a=p.geometry.attributes.position.array;
        const scale=mode==='speaking'?1+active*.18:mode==='listening'?1-active*.065:mode==='thinking'?1.025:1;
        for(let i=0;i<p.phases.length;i++) {const s=scale+Math.sin(t*1.7+p.phases[i])*.015;for(let k=0;k<3;k++)a[i*3+k]=p.base[i*3+k]*s;}
        p.geometry.attributes.position.needsUpdate=true;p.material.opacity=p.opacity+active*.15;
      }
      const speed=mode==='thinking'?.012:.004;
      rings.forEach((r,i)=>r.rotation.y=t*(.09+i*.02));group.rotation.y=t*speed*20;group.rotation.x=Math.sin(t*.21)*.055;
      renderer.render(scene,camera);
    }
    frame=requestAnimationFrame(draw);
    return {dispose(){alive=false;cancelAnimationFrame(frame);observer.disconnect();resources.forEach(r=>r.dispose());renderer.dispose();renderer.domElement.remove();delete mount.dataset.rendered;}};
  };
})(window);
