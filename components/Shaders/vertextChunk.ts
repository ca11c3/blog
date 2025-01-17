export const vertexChunk1 = /* glsl */ `
    varying vec2 v_Uv;
    uniform vec2 u_Resolution;
    uniform vec2 u_Mouse;

    float circle(vec2 uv, vec2 position, float radius, vec2 resolution) {
        float aspect = resolution.x / resolution.y;
        vec2 scaledUV = vec2(uv.x * aspect, uv.y);
        vec2 scaledCenter = vec2(position.x * aspect, position.y);
        vec2 l = scaledUV - scaledCenter;
        float dist = length(l); // Euclidean distance

        return 1.0 - smoothstep(0.0, radius, dist);
    }
`;

export const vertexChunk2 = /* glsl */ `
    #include <begin_vertex>

    vec3 pos = transformed;
    v_Uv = uv;

    float circleShape = circle(uv, (u_Mouse * 0.5) + 0.5, 0.25, u_Resolution);
    float intensity = 0.8;
    pos.z += circleShape * intensity;

    transformed = pos;
`;
