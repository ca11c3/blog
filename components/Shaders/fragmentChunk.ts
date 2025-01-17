export const fragmentChunk1 = /* glsl */ `

    
    varying vec2 v_Uv;
    uniform vec2 u_Resolution;

    float circle(vec2 uv, vec2 position, float radius) {
     
        // float aspect = resolution.x / resolution.y;
    
        // vec2 scaledUv = vec2(uv.x *aspect, uv.y * aspect);

        // vec2 scaledCenter = vec2(position.x * aspect, position.y * aspect);

        float dist = distance(uv, position);

        return 1. - smoothstep(0.0, radius, dist);
    }


   

`;

export const fragmentChunk2 = /* glsl */ `

    #include <opaque_fragment>

   
 
    gl_FragColor = vec4(outgoingLight , diffuseColor.a); 
  
`;
