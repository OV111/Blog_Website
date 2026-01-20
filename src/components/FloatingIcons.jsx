import React from "react";
import { motion } from "framer-motion";
import {
  JavaScriptIcon,
  CSharpIcon,
  DotNetIcon,
  DatabaseIcon,
  PythonIcon,
  MongoDBIcon,
  AWSIcon,
  ReactIcon,
  NodeIcon,
  RedisIcon,
  VercelIcon,
  DockerIcon,
} from "../icons/techIcon";
import Icon from "@mui/material/Icon";

function FloatingIcon({ icon, initialX, initialY, duration, delay, size }) {
  return (
    <motion.div
      className="absolute"
      initial={{ x: initialX, y: initialY, opacity: 0, scale: 0.8 }}
      animate={{
        x: [initialX, initialX + 20, initialX - 15, initialX + 10, initialX],
        y: [initialY, initialY - 20, initialY + 10, initialY - 15, initialY],
        opacity: [0, 1, 1, 1, 1],
        scale: [0.8, 1, 1, 1, 1],
        rotate: [0, 5, -5, 3, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      style={{ width: size, height: size }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl" />
        <div className="relative w-full h-full drop-shadow-2xl">{icon}</div>
      </div>
    </motion.div>
  );
}

const iconsByCategory = {
  fullstack: [
    { Icon: ReactIcon, x: "15%", y: "20%", size: 56, duration: 8, delay: 0.3 },
    {
      Icon: JavaScriptIcon,
      x: "75%",
      y: "25%",
      size: 56,
      duration: 9,
      delay: 0.7,
    },
    // { Icon: TypeScriptIcon, x: "25%", y: "65%", size: 52, duration: 7, delay: 1 },
    // { Icon: TailwindIcon, x: "80%", y: "70%", size: 58, duration: 8.5, delay: 1.5 },
    // { Icon: FigmaIcon, x: "45%", y: "15%", size: 54, duration: 9.5, delay: 0.5 },
    {
      Icon: VercelIcon,
      x: "45%",
      y: "15%",
      size: 56,
      duration: 9.5,
      delay: 0.5,
    },
    { Icon: NodeIcon, x: "5%", y: "15%", size: 56, duration: 9.5, delay: 0.5 },
    {
      Icon: CSharpIcon,
      x: "20%",
      y: "15%",
      size: 56,
      duration: 9.5,
      delay: 0.5,
    },
    {
      Icon: DotNetIcon,
      x: "20%",
      y: "45%",
      size: 56,
      duration: 9.5,
      delay: 0.5,
    },
    {
      Icon: MongoDBIcon,
      x: "20%",
      y: "85%",
      size: 56,
      duration: 9.5,
      delay: 0.5,
    },

    {
      Icon: DockerIcon,
      x: "80%",
      y: "85%",
      size: 56,
      duration: 9.5,
      delay: 0.5,
    },

    { Icon: AWSIcon, x: "50%", y: "45%", size: 56, duration: 9.5, delay: 0.5 },

    {
      Icon: DatabaseIcon,
      x: "40%",
      y: "95%",
      size: 56,
      duration: 9.5,
      delay: 0.5,
    },
  ],

  backend: [
    { Icon: NodeIcon, x: "20%", y: "30%", size: 60, duration: 8, delay: 0.3 },
    { Icon: PythonIcon, x: "70%", y: "20%", size: 56, duration: 9, delay: 0.7 },
    { Icon: CSharpIcon, x: "30%", y: "70%", size: 52, duration: 7, delay: 1 },
    {
      Icon: DatabaseIcon,
      x: "75%",
      y: "65%",
      size: 58,
      duration: 8.5,
      delay: 1.5,
    },
    { Icon: RedisIcon, x: "20%", y: "5%", size: 54, duration: 9.5, delay: 0.5 },
  ],

  database: [
    {
      Icon: DatabaseIcon,
      x: "25%",
      y: "25%",
      size: 60,
      duration: 8,
      delay: 0.3,
    },
    // { Icon: PostgreSQLIcon, x: "70%", y: "30%", size: 56, duration: 9, delay: 0.7 },
    // { Icon: MongoDBIcon, x: "35%", y: "70%", size: 52, duration: 7, delay: 1 },
    {
      Icon: RedisIcon,
      x: "75%",
      y: "60%",
      size: 58,
      duration: 8.5,
      delay: 1.5,
    },
  ],

  devops: [
    // { Icon: DockerIcon, x: "20%", y: "35%", size: 60, duration: 8, delay: 0.3 },
    // { Icon: KubernetesIcon, x: "70%", y: "25%", size: 56, duration: 9, delay: 0.7 },
    // { Icon: AWSIcon, x: "30%", y: "65%", size: 52, duration: 7, delay: 1 },
    // { Icon: GitIcon, x: "75%", y: "70%", size: 58, duration: 8.5, delay: 1.5 },
  ],

  // all: [
  //   { Icon: JavaScriptIcon, x: "8%", y: "20%", size: 60, duration: 8, delay: 0.3 },
  //   { Icon: CSharpIcon, x: "10%", y: "45%", size: 56, duration: 9, delay: 0.7 },
  //   { Icon: DatabaseIcon, x: "17%", y: "65%", size: 52, duration: 7, delay: 1 },
  //   { Icon: PythonIcon, x: "30%", y: "80%", size: 60, duration: 10, delay: 0.3 },
  //   { Icon: RedisIcon, x: "20%", y: "25%", size: 58, duration: 8.5, delay: 1.5 },
  //   { Icon: DockerIcon, x: "85%", y: "55%", size: 58, duration: 8.5, delay: 0.6 },
  //   { Icon: AWSIcon, x: "40%", y: "15%", size: 54, duration: 8.5, delay: 1.6 },
  //   { Icon: ReactIcon, x: "80%", y: "30%", size: 54, duration: 9.5, delay: 0.5 },
  //   { Icon: NodeJSIcon, x: "70%", y: "12%", size: 50, duration: 7.5, delay: 1.2 },
  //   { Icon: GitIcon, x: "60%", y: "85%", size: 52, duration: 9, delay: 0.3 },
  // ],
};

// const icons = [
//   {
//     Icon: JavaScriptIcon,
//     x: "8%",
//     y: "20%",
//     size: 60,
//     duration: 8,
//     delay: 0.3,
//   },
//   { Icon: CSharpIcon, x: "10%", y: "45%", size: 56, duration: 9, delay: 0.7 },
//   { Icon: DatabaseIcon, x: "17%", y: "65%", size: 52, duration: 7, delay: 1 },
//     { Icon: PythonIcon, x: "30%", y: "80%", size: 60, duration: 10, delay: 0.3 },
//   { Icon: RedisIcon, x: "20%", y: "25%", size: 58, duration: 8.5, delay: 1.5 },
//   { Icon: DockerIcon, x: "85%", y: "55%", size: 58, duration: 8.5, delay: 0.6 },
//   { Icon: AWSIcon, x: "40%", y: "15%", size: 54, duration: 8.5, delay: 1.6 },

//   { Icon: ReactIcon, x: "80%", y: "30%", size: 54, duration: 9.5, delay: 0.5 },
//   { Icon: NodeJSIcon, x: "70%", y: "12%", size: 50, duration: 7.5, delay: 1.2 },
//   { Icon: GitIcon, x: "60%", y: "85%", size: 52, duration: 9, delay: 0.3 },
// ];

export function FloatingIcons({ category }) {
  const icons = iconsByCategory[category] || iconsByCategory.all;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {icons.map((item, index) => (
        <div
          key={index}
          className="absolute"
          style={{ left: item.x, top: item.y }}
        >
          <FloatingIcon
            icon={<item.Icon className="w-full h-full" />}
            initialX={0}
            initialY={0}
            duration={item.duration}
            delay={item.delay}
            size={item.size}
          />
        </div>
      ))}

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
    </div>
  );
}
