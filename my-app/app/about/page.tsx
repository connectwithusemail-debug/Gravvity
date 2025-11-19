"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import MagicButton from "@/components/magic-button";
import { Divide } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen mt-10 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="mb-16 text-center slide-in-up">
            <h1 className="text-5xl md:text-6xl text-center font-bold gradient-text mb-4">
              About Gravity
            </h1>
            <p className="text-xl text-foreground/70">
              Building the future of technology together
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="card-glow p-8 slide-in-up">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Gravity is a technical society dedicated to fostering
                innovation, collaboration, and excellence in technology. We
                bring together passionate individuals across seven distinct
                domains to create, learn, and grow together.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Whether you're into competitive programming, web development,
                design, open-source, AI, blockchain, or the metaverse, Gravity
                provides the platform and community to achieve your goals.
              </p>
            </div>

            <div
              className="card-glow p-8 slide-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                To create a vibrant ecosystem of tech enthusiasts who push the
                boundaries of innovation and collaborate to solve real-world
                problems.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                We believe in the power of community, continuous learning, and
                practical application of knowledge. Together, we're shaping the
                future of technology.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  title: "Innovation",
                  icon: (
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
                  ),
                  description:
                    "Pushing boundaries and exploring new technologies",
                },
                {
                  title: "Collaboration",
                  icon: (
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
                  ),
                  description: "Working together to achieve greater goals",
                },
                {
                  title: "Excellence",
                  icon: (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                      >
                        <defs>
                          <mask id="SVGKkdZ2csA">
                            <g
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="4"
                            >
                              <path
                                fill="#fff"
                                stroke="#fff"
                                d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012z"
                              />
                              <path stroke="#000" d="m17 24l5 5l10-10" />
                            </g>
                          </mask>
                        </defs>
                        <path
                          fill="#fff"
                          d="M0 0h48v48H0z"
                          mask="url(#SVGKkdZ2csA)"
                        />
                      </svg>
                    </div>
                  ),
                  description: "Striving for the highest quality in everything",
                },
                {
                  title: "Growth",
                  icon: (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#fff"
                          d="M3 16.359V21h20v2H1V1h2v12.545l2.287-2.263a3 3 0 1 1 5.592-.437l2.757 2.482a3 3 0 0 1 2.256-.192l2.86-5.148a3 3 0 1 1 1.748.972l-2.995 5.39a3 3 0 1 1-5.246.43l-2.561-2.305A3 3 0 0 1 8 13c-.467 0-.91-.107-1.304-.298z"
                        />
                      </svg>
                    </div>
                  ),
                  description: "Continuous learning and personal development",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="card-glow p-6 flex items-center justify-center flex-col gap-2 text-center slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div>{value.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-foreground/60 text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="card-glow p-8 text-center slide-in-up">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Whether you're a beginner just starting your tech journey or an
              experienced developer, Gravity welcomes you. Join us in building
              an amazing tech community!
            </p>
            <MagicButton heightClass="h-11" href="/contact">
              Get Started Today
            </MagicButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
