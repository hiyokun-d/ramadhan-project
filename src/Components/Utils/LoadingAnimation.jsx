import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = ({ activateTheDots = true }) => {
  // Container styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    position: 'relative',
  };

  // Create a 3D perspective container
  const perspectiveStyle = {
    perspective: '1000px',
    height: '300px',
    width: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  // Text variants with more dynamic animation
  const textVariants = {
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0.8, 1.2, 1, 0.9],
      letterSpacing: ["0em", "0.2em", "0.1em"],
      filter: [
        "blur(5px) brightness(0.5)",
        "blur(0px) brightness(1.2)",
        "blur(0px) brightness(1.5)",
        "blur(8px) brightness(0.8)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smooth motion
      }
    }
  };

  // Background particles
  const generateParticles = (count) => {
    return Array(count).fill().map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random starting position
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      color: `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 40 + 50}%)`,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 2
    }));
  };

  const particles = generateParticles(20);

  // 3D rotating cube animation
  const cubeSize = 120;
  const faces = [
    { rotateX: 0, rotateY: 0, z: cubeSize / 2, color: 'rgba(0, 150, 255, 0.7)' },     // front
    { rotateX: 0, rotateY: 180, z: cubeSize / 2, color: 'rgba(0, 100, 255, 0.7)' },    // back
    { rotateX: -90, rotateY: 0, z: cubeSize / 2, color: 'rgba(100, 75, 255, 0.7)' },  // top
    { rotateX: 90, rotateY: 0, z: cubeSize / 2, color: 'rgba(150, 50, 255, 0.7)' },   // bottom
    { rotateX: 0, rotateY: -90, z: cubeSize / 2, color: 'rgba(200, 25, 255, 0.7)' },  // left
    { rotateX: 0, rotateY: 90, z: cubeSize / 2, color: 'rgba(255, 0, 255, 0.7)' },    // right
  ];

  // Orbital circles variants
  const orbitalVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Satellite animation
  const satelliteCount = 6;
  const satelliteVariants = {
    animate: i => ({
      rotate: [0, 360],
      scale: [1, 1.2, 0.8, 1],
      transition: {
        rotate: {
          duration: 6 + i * 2,
          repeat: Infinity,
          ease: "linear"
        },
        scale: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }
    })
  };

  // Pulsing ring variants
  const ringVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.7, 0, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div style={containerStyle}>
      {/* Floating particles in background */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            x: [
              `${particle.x}%`,
              `${particle.x + (Math.random() * 20 - 10)}%`,
              `${particle.x - (Math.random() * 20 - 10)}%`,
              `${particle.x}%`
            ],
            y: [
              `${particle.y}%`,
              `${particle.y - (Math.random() * 20)}%`,
              `${particle.y + (Math.random() * 10)}%`,
              `${particle.y}%`
            ],
            opacity: [0.3, 0.8, 0.5, 0.3],
            scale: [1, 1.5, 0.8, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* 3D perspective container */}
      <div style={perspectiveStyle}>
        {/* Pulsing rings */}
        {[1, 2, 3].map((ring, index) => (
          <motion.div
            key={`ring-${index}`}
            style={{
              position: 'absolute',
              width: `${200 + index * 50}px`,
              height: `${200 + index * 50}px`,
              borderRadius: '50%',
              border: `2px solid rgba(100, 100, 255, ${0.5 - index * 0.1})`,
              boxShadow: `0 0 20px rgba(100, 100, 255, ${0.5 - index * 0.1})`,
            }}
            variants={ringVariants}
            animate="animate"
            transition={{ delay: index * 0.5 }}
          />
        ))}

        {/* Rotating 3D cube */}
        <motion.div
          style={{
            position: 'relative',
            width: cubeSize,
            height: cubeSize,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {faces.map((face, index) => (
            <motion.div
              key={`face-${index}`}
              style={{
                position: 'absolute',
                width: cubeSize,
                height: cubeSize,
                backgroundColor: face.color,
                transform: `rotateX(${face.rotateX}deg) rotateY(${face.rotateY}deg) translateZ(${face.z}px)`,
                backfaceVisibility: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
              animate={{
                backgroundColor: [
                  face.color,
                  `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 50}, 255, 0.7)`,
                  face.color
                ],
                boxShadow: [
                  '0 0 10px rgba(0, 100, 255, 0.3) inset',
                  '0 0 30px rgba(0, 150, 255, 0.6) inset',
                  '0 0 10px rgba(0, 100, 255, 0.3) inset'
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            >
              <motion.div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Orbiting elements */}
        {Array.from({ length: satelliteCount }).map((_, index) => {
          const angle = (index / satelliteCount) * Math.PI * 2;
          const radius = 150;

          return (
            <motion.div
              key={`satellite-container-${index}`}
              style={{
                position: 'absolute',
                width: radius * 2,
                height: radius * 2,
                borderRadius: '50%',
              }}
              custom={index}
              variants={satelliteVariants}
              animate="animate"
            >
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: radius,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: `hsl(${index * 60}, 100%, 70%)`,
                  boxShadow: `0 0 15px hsl(${index * 60}, 100%, 70%)`,
                  marginLeft: '-10px',
                  marginTop: '-10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                animate={{
                  scale: [1, 1.3, 0.8, 1],
                  boxShadow: [
                    `0 0 10px hsl(${index * 60}, 100%, 70%)`,
                    `0 0 25px hsl(${index * 60}, 100%, 80%)`,
                    `0 0 10px hsl(${index * 60}, 100%, 70%)`,
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Loading dots */}
      {activateTheDots ? (
        <div style={{ marginTop: '60px', display: 'flex', gap: '12px' }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`dot-${i}`}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: 'white',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default LoadingAnimation;
