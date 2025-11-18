"use client";
import { BlurText, GradualSpacing } from "@/components/Text-Effect";

export function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-4xl mx-auto">
        
          <GradualSpacing text="About Gravity" className="text-4xl md:text-5xl font-bold mb-8 gradient-text select-none"/>

        <div className="grid md:grid-cols-2 selection:bg-[#6555554f]  selection:text-white gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white select-none">
              Our Mission
            </h3>

            <BlurText
              text="Gravity is a premier technical society dedicated to fostering
              innovation, creativity, and excellence in technology. We bring
              together passionate developers, designers, and tech enthusiasts
              from across the campus."
              delay={10}
              animateBy="words"
              direction="top"
              className="text-foreground/70 leading-relaxed mb-4"
            />

            <BlurText
              text=" Through our seven specialized wings, we provide platforms for
              learning, collaboration, and real-world project experience in
              cutting-edge technologies."
              delay={10}
              animateBy="words"
              direction="top"
              className="text-foreground/70 leading-relaxed"
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 text-white select-none">
              Our Vision
            </h3>

            <BlurText
              text="To become the leading hub for technological innovation and talent
              development, creating leaders who shape the future of technology."
              delay={10}
              animateBy="words"
              direction="top"
              className="text-foreground/70 leading-relaxed mb-4"
            />

            <BlurText
              text=" We aim to bridge the gap between academics and industry, fostering
              a community where ideas transform into impactful solutions."
              delay={10}
              animateBy="words"
              direction="top"
              className="text-foreground/70 leading-relaxed"
            />
          </div>
        </div>

        <div className="mt-12 p-8 bg-linear-to-r from-purple-500/10 to-cyan-500/10 border flex flex-col justify-center items-center selection:bg-[#544b543f] selection:text-white  border-purple-500/20 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4 text-white select-none">
            Core Values
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2 select-none">
                <div className="text-3xl mb-2 select-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M2.25 10A8.75 8.75 0 0 1 11 1.25c1.872 0 3.417.436 4.696 1.22c1.275.78 2.244 1.88 3.008 3.142c1.448 2.393 2.22 5.485 2.934 8.349l.09.357l.233.932H19.25v4h-3.5V23h-9.5v-5.65a8.74 8.74 0 0 1-4-7.35m10.181-4.996l.57 1.782l1.828-.397l1.432 2.479l-1.206 1.384l1.206 1.384l-1.432 2.48l-1.828-.398l-.57 1.782H9.57L9 13.718l-1.828.398l-1.432-2.48l1.206-1.384L5.74 8.868l1.432-2.48L9 6.786l.57-1.782zm-.036 5.248a1.392 1.392 0 1 0-2.784 0a1.392 1.392 0 0 0 2.784 0"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="font-bold text-lg mb-2 select-none">Innovation</h4>
              <p className="text-foreground/60 text-sm">
                Pushing boundaries and exploring new possibilities
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2 select-none">
                <div className="text-3xl mb-2 select-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="white"
                      d="M12.5 4.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m5 .5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-13 2a2 2 0 1 0 0-4a2 2 0 0 0 0 4M6 9.25C6 8.56 6.56 8 7.25 8h5.5c.69 0 1.25.56 1.25 1.25V14a4 4 0 0 1-8 0zm-1 0c0-.463.14-.892.379-1.25H3.25C2.56 8 2 8.56 2 9.25V13a3 3 0 0 0 3.404 2.973A5 5 0 0 1 5 14zM15 14c0 .7-.144 1.368-.404 1.973Q14.794 16 15 16a3 3 0 0 0 3-3V9.25C18 8.56 17.44 8 16.75 8h-2.129c.24.358.379.787.379 1.25z"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="font-bold text-lg mb-2 select-none">
                Collaboration
              </h4>
              <p className="text-foreground/60 text-sm">
                Working together to achieve greater goals
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2 select-none">
                <div className="text-3xl mb-2 select-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="white"
                      d="M104 37.25V215.1c3.6 9.9 10 14.1 20.9 17c11.4 2.9 27.1 3.1 43.9 3.1s34.6-.1 51.4 3.6c9.5 2.1 18.7 5.7 26.8 11.2V55.43c-7.2-9.9-15.9-13.69-27.3-15.09c-12.2-1.49-27.3.55-42.9 2.83c-15.7 2.28-31.9 4.81-47.7 2.88c-8.7-1.07-17.3-3.87-25.1-8.8m304 0c-7.8 4.93-16.4 7.73-25.1 8.8c-15.8 1.93-32-.6-47.7-2.88c-15.6-2.28-30.7-4.32-42.9-2.83c-11.4 1.4-20.1 5.19-27.3 15.09V250c8.1-5.5 17.3-9.1 26.8-11.2c16.8-3.7 34.6-3.6 51.4-3.6s32.5-.2 43.9-3.1c10.9-2.9 17.3-7.1 20.9-17zM130.8 80.03h89.4v18h-89.4zm161 0h89.4v18h-89.4zm-161 44.47h89.4v18h-89.4zm161 0h89.4v18h-89.4zm-161 46.8h89.4v18h-89.4zm161 0h89.4v18h-89.4zM96 249c-17.3 0-29.19 7.3-37.77 18.9C49.66 279.4 45 295.7 45 312s4.66 32.6 13.23 44.1C66.81 367.7 78.7 375 96 375c22 0 35.7-7.1 44.4-14c8.6-6.9 11.5-13 11.5-13l2.5-5h203.2l2.5 5s2.9 6.1 11.5 13c8.7 6.9 22.4 14 44.4 14c17.3 0 29.2-7.3 37.8-18.9c8.5-11.5 13.2-27.8 13.2-44.1s-4.7-32.6-13.2-44.1c-8.6-11.6-20.5-18.9-37.8-18.9c-22 0-35.7 7.1-44.4 14c-8.6 6.9-11.5 13-11.5 13l-2.5 5H154.4l-2.5-5s-2.9-6.1-11.5-13c-8.7-6.9-22.4-14-44.4-14m4.6 21.9c.9 0 1.9 0 2.9.1c13.5 1.2 28.2 8.9 44.1 24h216.8c15.9-15.1 30.6-22.8 44.1-24c14.2-1.2 26.6 5.8 33.1 16.2c13.1 20.9 7 53.9-20.6 72.3l-10-15c20.4-13.6 22.3-36.6 15.4-47.7c-3.5-5.6-8.1-8.6-16.4-7.8c-8.2.7-20.6 6.3-35.6 21.4l-2.7 2.6H140.3l-2.7-2.6c-15-15.1-27.4-20.7-35.6-21.4c-8.26-.8-12.9 2.2-16.37 7.8c-6.92 11.1-4.99 34.1 15.37 47.7l-9.99 15c-27.65-18.4-33.72-51.4-20.64-72.3c5.72-9.1 15.9-15.6 27.92-16.3zM169 361v126h30V361zm48 0v126h30V361zm48 0v126h30V361zm48 0v126h30V361z"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="font-bold text-lg mb-2 select-none">Learning</h4>
              <p className="text-foreground/60 text-sm">
                Continuous growth and skill development
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
