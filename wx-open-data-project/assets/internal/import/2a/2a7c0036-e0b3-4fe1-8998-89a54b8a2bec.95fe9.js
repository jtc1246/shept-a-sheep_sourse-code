module.exports = [ 1, 0, 0, [ [ "cc.EffectAsset", [ "_name", "shaders", "techniques" ], 0 ] ], [ [ 0, 0, 1, 2, 4 ] ], [ [ 0, "builtin-3d-trail", [ {
    hash: 2929688198,
    record: null,
    name: "builtin-3d-trail|particle-trail:vs_main|tinted-fs:add",
    glsl3: {
        vert: "\nprecision mediump float;\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nin vec3 a_position;\nin vec4 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    out vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
        frag: "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\n#if CC_DRAW_WIRE_FRAME\n  in vec3 vBarycentric;\n#endif\nuniform sampler2D mainTexture;\nuniform FragConstants {\n  vec4 tintColor;\n};\nvec4 add () {\n  vec4 col = 2.0 * color * tintColor * texture(mainTexture, uv);\n  #if CC_DRAW_WIRE_FRAME\n      if (any(lessThan(vBarycentric, vec3(0.02)))) {\n          col = vec4(0., 1., 1., 1.);\n      }\n  #endif\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = add(); }"
    },
    glsl1: {
        vert: "\nprecision mediump float;\nuniform vec4 mainTiling_Offset;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nattribute vec3 a_position;\nattribute vec4 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    varying vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
        frag: "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\n#if CC_DRAW_WIRE_FRAME\n  varying vec3 vBarycentric;\n#endif\nuniform sampler2D mainTexture;\nuniform vec4 tintColor;\nvec4 add () {\n  vec4 col = 2.0 * color * tintColor * texture2D(mainTexture, uv);\n  #if CC_DRAW_WIRE_FRAME\n      if (any(lessThan(vBarycentric, vec3(0.02)))) {\n          col = vec4(0., 1., 1., 1.);\n      }\n  #endif\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = add(); }"
    },
    builtins: {
        globals: {
            blocks: [ {
                name: "CCGlobal",
                defines: []
            } ],
            samplers: []
        },
        locals: {
            blocks: [ {
                name: "CCLocal",
                defines: []
            } ],
            samplers: []
        }
    },
    defines: [ {
        name: "CC_DRAW_WIRE_FRAME",
        type: "boolean",
        defines: []
    }, {
        name: "CC_USE_WORLD_SPACE",
        type: "boolean",
        defines: []
    }, {
        name: "OUTPUT_TO_GAMMA",
        type: "boolean",
        defines: []
    } ],
    blocks: [ {
        name: "Constants",
        binding: 0,
        members: [ {
            name: "mainTiling_Offset",
            type: 16,
            count: 1
        }, {
            name: "frameTile_velLenScale",
            type: 16,
            count: 1
        }, {
            name: "scale",
            type: 16,
            count: 1
        } ],
        defines: []
    }, {
        name: "FragConstants",
        binding: 1,
        members: [ {
            name: "tintColor",
            type: 16,
            count: 1
        } ],
        defines: []
    } ],
    samplers: [ {
        name: "mainTexture",
        type: 29,
        count: 1,
        binding: 30,
        defines: []
    } ]
}, {
    hash: 4224037318,
    record: null,
    name: "builtin-3d-trail|particle-trail:vs_main|tinted-fs:multiply",
    glsl3: {
        vert: "\nprecision mediump float;\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nin vec3 a_position;\nin vec4 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    out vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
        frag: "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\n#if CC_DRAW_WIRE_FRAME\n  in vec3 vBarycentric;\n#endif\nuniform sampler2D mainTexture;\nuniform FragConstants {\n  vec4 tintColor;\n};\nvec4 multiply () {\n  vec4 col;\n  vec4 texColor = texture(mainTexture, uv);\n  col.rgb = tintColor.rgb * texColor.rgb * color.rgb * vec3(2.0);\n  col.a = (1.0 - texColor.a) * (tintColor.a * color.a * 2.0);\n  #if CC_DRAW_WIRE_FRAME\n      if (any(lessThan(vBarycentric, vec3(0.02)))) {\n          col = vec4(0., 1., 1., col.a);\n      }\n  #endif\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = multiply(); }"
    },
    glsl1: {
        vert: "\nprecision mediump float;\nuniform vec4 mainTiling_Offset;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nattribute vec3 a_position;\nattribute vec4 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    varying vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
        frag: "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\n#if CC_DRAW_WIRE_FRAME\n  varying vec3 vBarycentric;\n#endif\nuniform sampler2D mainTexture;\nuniform vec4 tintColor;\nvec4 multiply () {\n  vec4 col;\n  vec4 texColor = texture2D(mainTexture, uv);\n  col.rgb = tintColor.rgb * texColor.rgb * color.rgb * vec3(2.0);\n  col.a = (1.0 - texColor.a) * (tintColor.a * color.a * 2.0);\n  #if CC_DRAW_WIRE_FRAME\n      if (any(lessThan(vBarycentric, vec3(0.02)))) {\n          col = vec4(0., 1., 1., col.a);\n      }\n  #endif\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = multiply(); }"
    },
    builtins: {
        globals: {
            blocks: [ {
                name: "CCGlobal",
                defines: []
            } ],
            samplers: []
        },
        locals: {
            blocks: [ {
                name: "CCLocal",
                defines: []
            } ],
            samplers: []
        }
    },
    defines: [ {
        name: "CC_DRAW_WIRE_FRAME",
        type: "boolean",
        defines: []
    }, {
        name: "CC_USE_WORLD_SPACE",
        type: "boolean",
        defines: []
    }, {
        name: "OUTPUT_TO_GAMMA",
        type: "boolean",
        defines: []
    } ],
    blocks: [ {
        name: "Constants",
        binding: 0,
        members: [ {
            name: "mainTiling_Offset",
            type: 16,
            count: 1
        }, {
            name: "frameTile_velLenScale",
            type: 16,
            count: 1
        }, {
            name: "scale",
            type: 16,
            count: 1
        } ],
        defines: []
    }, {
        name: "FragConstants",
        binding: 1,
        members: [ {
            name: "tintColor",
            type: 16,
            count: 1
        } ],
        defines: []
    } ],
    samplers: [ {
        name: "mainTexture",
        type: 29,
        count: 1,
        binding: 30,
        defines: []
    } ]
}, {
    hash: 1704877102,
    record: null,
    name: "builtin-3d-trail|particle-trail:vs_main|no-tint-fs:addSmooth",
    glsl3: {
        vert: "\nprecision mediump float;\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nin vec3 a_position;\nin vec4 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    out vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
        frag: "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\nuniform sampler2D mainTexture;\nvec4 addSmooth () {\n  vec4 col = color * texture(mainTexture, uv);\n  col.rgb *= col.a;\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = addSmooth(); }"
    },
    glsl1: {
        vert: "\nprecision mediump float;\nuniform vec4 mainTiling_Offset;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nattribute vec3 a_position;\nattribute vec4 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    varying vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
        frag: "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\nuniform sampler2D mainTexture;\nvec4 addSmooth () {\n  vec4 col = color * texture2D(mainTexture, uv);\n  col.rgb *= col.a;\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = addSmooth(); }"
    },
    builtins: {
        globals: {
            blocks: [ {
                name: "CCGlobal",
                defines: []
            } ],
            samplers: []
        },
        locals: {
            blocks: [ {
                name: "CCLocal",
                defines: []
            } ],
            samplers: []
        }
    },
    defines: [ {
        name: "CC_DRAW_WIRE_FRAME",
        type: "boolean",
        defines: []
    }, {
        name: "CC_USE_WORLD_SPACE",
        type: "boolean",
        defines: []
    }, {
        name: "OUTPUT_TO_GAMMA",
        type: "boolean",
        defines: []
    } ],
    blocks: [ {
        name: "Constants",
        binding: 0,
        members: [ {
            name: "mainTiling_Offset",
            type: 16,
            count: 1
        }, {
            name: "frameTile_velLenScale",
            type: 16,
            count: 1
        }, {
            name: "scale",
            type: 16,
            count: 1
        } ],
        defines: []
    } ],
    samplers: [ {
        name: "mainTexture",
        type: 29,
        count: 1,
        binding: 30,
        defines: []
    } ]
}, {
    hash: 2717357054,
    record: null,
    name: "builtin-3d-trail|particle-trail:vs_main|no-tint-fs:premultiplied",
    glsl3: {
        vert: "\nprecision mediump float;\nuniform Constants{\n    vec4 mainTiling_Offset;\n    vec4 frameTile_velLenScale;\n    vec4 scale;\n};\nuniform CCGlobal {\n  mat4 cc_matView;\n  mat4 cc_matViewInv;\n  mat4 cc_matProj;\n  mat4 cc_matProjInv;\n  mat4 cc_matViewProj;\n  mat4 cc_matViewProjInv;\n  vec4 cc_cameraPos;\n  vec4 cc_time;\n  mediump vec4 cc_screenSize;\n  mediump vec4 cc_screenScale;\n};\nuniform CCLocal {\n  mat4 cc_matWorld;\n  mat4 cc_matWorldIT;\n};\nout vec2 uv;\nout vec4 color;\nin vec3 a_position;\nin vec4 a_texCoord;\nin vec3 a_texCoord1;\nin vec3 a_texCoord2;\nin vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    out vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
        frag: "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nin vec2 uv;\nin vec4 color;\nuniform sampler2D mainTexture;\nvec4 premultiplied () {\n  vec4 col = color * texture(mainTexture, uv) * color.a;\n  return CCFragOutput(col);\n}\nout vec4 cc_FragColor;\nvoid main() { cc_FragColor = premultiplied(); }"
    },
    glsl1: {
        vert: "\nprecision mediump float;\nuniform vec4 mainTiling_Offset;\nuniform mat4 cc_matViewProj;\nuniform vec4 cc_cameraPos;\nuniform mat4 cc_matWorld;\nvarying vec2 uv;\nvarying vec4 color;\nattribute vec3 a_position;\nattribute vec4 a_texCoord;\nattribute vec3 a_texCoord1;\nattribute vec3 a_texCoord2;\nattribute vec4 a_color;\n#if CC_DRAW_WIRE_FRAME\n    varying vec3 vBarycentric;\n#endif\nvec4 vs_main() {\n    highp vec4 pos = vec4(a_position, 1);\n    vec4 velocity = vec4(a_texCoord1.xyz, 0);\n#if !CC_USE_WORLD_SPACE\n    pos = cc_matWorld * pos;\n    velocity = cc_matWorld * velocity;\n#endif\n    float vertOffset = (a_texCoord.x - 0.5) * a_texCoord.y;\n    vec3 camUp = normalize(cross(pos.xyz - cc_cameraPos.xyz, velocity.xyz));\n    pos.xyz += camUp * vertOffset;\n    pos = cc_matViewProj * pos;\n    uv = a_texCoord.zw * mainTiling_Offset.xy + mainTiling_Offset.zw;;\n    color = a_color;\n#if CC_DRAW_WIRE_FRAME\n    vBarycentric = a_texCoord2;\n#endif\n    return pos;\n}\nvoid main() { gl_Position = vs_main(); }",
        frag: "\nprecision mediump float;\nvec4 CCFragOutput (vec4 color) {\n  #if OUTPUT_TO_GAMMA\n    color.rgb = sqrt(color.rgb);\n  #endif\n\treturn color;\n}\nvarying vec2 uv;\nvarying vec4 color;\nuniform sampler2D mainTexture;\nvec4 premultiplied () {\n  vec4 col = color * texture2D(mainTexture, uv) * color.a;\n  return CCFragOutput(col);\n}\nvoid main() { gl_FragColor = premultiplied(); }"
    },
    builtins: {
        globals: {
            blocks: [ {
                name: "CCGlobal",
                defines: []
            } ],
            samplers: []
        },
        locals: {
            blocks: [ {
                name: "CCLocal",
                defines: []
            } ],
            samplers: []
        }
    },
    defines: [ {
        name: "CC_DRAW_WIRE_FRAME",
        type: "boolean",
        defines: []
    }, {
        name: "CC_USE_WORLD_SPACE",
        type: "boolean",
        defines: []
    }, {
        name: "OUTPUT_TO_GAMMA",
        type: "boolean",
        defines: []
    } ],
    blocks: [ {
        name: "Constants",
        binding: 0,
        members: [ {
            name: "mainTiling_Offset",
            type: 16,
            count: 1
        }, {
            name: "frameTile_velLenScale",
            type: 16,
            count: 1
        }, {
            name: "scale",
            type: 16,
            count: 1
        } ],
        defines: []
    } ],
    samplers: [ {
        name: "mainTexture",
        type: 29,
        count: 1,
        binding: 30,
        defines: []
    } ]
} ], [ {
    name: "add",
    passes: [ {
        program: "builtin-3d-trail|particle-trail:vs_main|tinted-fs:add",
        rasterizerState: {
            cullMode: 0
        },
        blendState: {
            targets: [ {
                blend: true,
                blendSrc: 770,
                blendDst: 1,
                blendSrcAlpha: 770,
                blendDstAlpha: 1
            } ]
        },
        depthStencilState: {
            depthTest: true,
            depthWrite: false
        },
        properties: {
            mainTexture: {
                value: "grey",
                type: 29
            },
            mainTiling_Offset: {
                type: 16,
                value: [ 1, 1, 0, 0 ]
            },
            frameTile_velLenScale: {
                type: 16,
                value: [ 1, 1, 0, 0 ]
            },
            tintColor: {
                type: 16,
                value: [ .5, .5, .5, .5 ],
                inspector: {
                    type: "color"
                }
            }
        }
    } ]
}, {
    name: "alpha-blend",
    passes: [ {
        program: "builtin-3d-trail|particle-trail:vs_main|tinted-fs:add",
        rasterizerState: {
            cullMode: 0
        },
        blendState: {
            targets: [ {
                blend: true,
                blendSrc: 1,
                blendDst: 771,
                blendSrcAlpha: 1,
                blendDstAlpha: 771
            } ]
        },
        depthStencilState: {
            depthTest: true,
            depthWrite: false
        },
        properties: {
            mainTexture: {
                value: "grey",
                type: 29
            },
            mainTiling_Offset: {
                type: 16,
                value: [ 1, 1, 0, 0 ]
            },
            frameTile_velLenScale: {
                type: 16,
                value: [ 1, 1, 0, 0 ]
            },
            tintColor: {
                type: 16,
                value: [ .5, .5, .5, .5 ],
                inspector: {
                    type: "color"
                }
            }
        }
    } ]
}, {
    name: "add-multiply",
    passes: [ {
        program: "builtin-3d-trail|particle-trail:vs_main|tinted-fs:multiply",
        rasterizerState: {
            cullMode: 0
        },
        blendState: {
            targets: [ {
                blend: true,
                blendSrc: 1,
                blendDst: 771,
                blendSrcAlpha: 1,
                blendDstAlpha: 771
            } ]
        },
        depthStencilState: {
            depthTest: true,
            depthWrite: false
        },
        properties: {
            mainTexture: {
                value: "grey",
                type: 29
            },
            mainTiling_Offset: {
                type: 16,
                value: [ 1, 1, 0, 0 ]
            },
            frameTile_velLenScale: {
                type: 16,
                value: [ 1, 1, 0, 0 ]
            },
            tintColor: {
                type: 16,
                value: [ .5, .5, .5, .5 ],
                inspector: {
                    type: "color"
                }
            }
        }
    } ]
}, {
    name: "add-smooth",
    passes: [ {
        program: "builtin-3d-trail|particle-trail:vs_main|no-tint-fs:addSmooth",
        rasterizerState: {
            cullMode: 0
        },
        blendState: {
            targets: [ {
                blend: true,
                blendSrc: 1,
                blendDst: 771,
                blendSrcAlpha: 1,
                blendDstAlpha: 771
            } ]
        },
        depthStencilState: {
            depthTest: true,
            depthWrite: false
        },
        properties: {
            mainTexture: {
                value: "grey",
                type: 29
            },
            mainTiling_Offset: {
                type: 16,
                value: [ 1, 1, 0, 0 ]
            },
            frameTile_velLenScale: {
                type: 16,
                value: [ 1, 1, 0, 0 ]
            }
        }
    } ]
}, {
    name: "premultiply-blend",
    passes: [ {
        program: "builtin-3d-trail|particle-trail:vs_main|no-tint-fs:premultiplied",
        rasterizerState: {
            cullMode: 0
        },
        blendState: {
            targets: [ {
                blend: true,
                blendSrc: 1,
                blendDst: 771,
                blendSrcAlpha: 1,
                blendDstAlpha: 771
            } ]
        },
        depthStencilState: {
            depthTest: true,
            depthWrite: false
        },
        properties: {
            mainTexture: {
                value: "grey",
                type: 29
            },
            mainTiling_Offset: {
                type: 16,
                value: [ 1, 1, 0, 0 ]
            },
            frameTile_velLenScale: {
                type: 16,
                value: [ 1, 1, 0, 0 ]
            }
        }
    } ]
} ] ] ], 0, 0, [], [], [] ];