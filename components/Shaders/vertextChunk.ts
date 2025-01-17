export const vertexChunk1 = /* glsl */ `
 
    varying vec2 v_Uv;


    float circle(vec2 uv, vec2 position, float radius) {
     
        // float aspect = resolution.x / resolution.y;
    
        // vec2 scaledUv = vec2(uv.x *aspect, uv.y * aspect);

        // vec2 scaledCenter = vec2(position.x * aspect, position.y * aspect);

        float dist = distance(uv, position);

        return 1. - smoothstep(0.0, radius, dist);
    }


`;

export const vertexChunk2 = /* glsl */ `
    #include <project_vertex>


        vec3 pos = transformed;
                v_Uv = uv;

        float circleShape = circle(uv, vec2(.5)+0.5, .5);
        float intensity = 0.7;
        pos.z += circleShape * intensity;


    transformed =pos;

`;

export const vertShader = /* glsl */ `
    varying vec2 v_Uv;

    void main() {
        v_Uv = uv;
        vec3 newPosition = position;

        float circleShape = circle(uv, vec2(.5), .5);
        float intensity = 0.7;
        newPosition.z += circleShape * intensity;


        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    }
`;
