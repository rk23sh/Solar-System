import * as THREE from 'three'

export function getSphere(radius, x=0, y=0, z=0){
    const geo = new THREE.SphereGeometry(radius);
    const mat = new THREE.MeshBasicMaterial({
        color: 0x87CEEB
    });
    const sphere = new THREE.Mesh(geo, mat);
    return sphere;
}

export function getSolarBody(radius, x=0, y=0, z=0, image, renderer){
    const geo = new THREE.SphereGeometry(radius, 64, 64);
    const texture = new THREE.TextureLoader().load(image);
    
    // trying to fix blurriness
    texture.encoding = THREE.sRGBEncoding
    texture.minFilter = THREE.LinearFilter; // or LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    
    const mat = new THREE.MeshBasicMaterial({
        map: texture
    });

    const solarBody = new THREE.Mesh(geo, mat);
    solarBody.position.set(x, y, z);
    return solarBody;
}