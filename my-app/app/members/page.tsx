"use client";

import { useMembers } from "@/hooks/use-members"
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Suspense, useMemo } from "react";
import type { Member } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import ProfileCard from "@/components/profile-card";
import "@/components/ProfileCard.css";
import MagicButton from "@/components/magic-button";
import { X } from "lucide-react";

function MembersContent() {
  const members = useMembers();
  const searchParams = useSearchParams();
  const wingFilter = searchParams.get("wing") || "";

  const { coordinators, regularMembers, heading, subheading } = useMemo(() => {
    let list = members;
    let heading = "Our Team";
    let subheading = "Meet the talented members of Gravity";
    const isWingFilter = wingFilter && wingFilter.toLowerCase() !== "overall";
    if (isWingFilter) {
      heading = `${wingFilter} Wing`;
      subheading = `Coordinators and members from the ${wingFilter} wing`;
      list = members.filter(
        (m) =>
          m.wing === wingFilter &&
          !m.isOverallCoordinator &&
          !m.isFacultyCoordinator
      );
    }
    return {
      coordinators: list.filter((m) => m.role === "coordinator"),
      regularMembers: list.filter((m) => m.role === "member"),
      heading,
      subheading,
    };
  }, [members, wingFilter]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen m-10 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 slide-in-up">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
              {heading}
            </h1>
            <p className="text-xl text-foreground/70">{subheading}</p>
          </div>

          {/* Coordinators Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-2 text-center">
              <span className="text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M7.475 21Q5.2 21 3.6 19.4T2 15.525q0-2.15 1.438-3.713t3.587-1.737L3 2h7l2 4l2-4h7l-4 8.025q2.125.2 3.563 1.763T22 15.5q0 2.3-1.6 3.9T16.5 21q-.225 0-.462-.012t-.463-.063q1.375-.9 2.15-2.337T18.5 15.5q0-2.725-1.888-4.612T12 9t-4.612 1.888T5.5 15.5q0 1.7.7 3.2t2.2 2.225q-.225.05-.462.063T7.475 21M12 20q-1.875 0-3.187-1.312T7.5 15.5t1.313-3.187T12 11t3.188 1.313T16.5 15.5t-1.312 3.188T12 20m-1.85-1.75l1.85-1.4l1.85 1.4l-.7-2.275L15 14.65h-2.275L12 12.25l-.725 2.4H9l1.85 1.325z"
                  />
                </svg>
              </span>
              <span>Coordinators</span>
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {coordinators.map((member) => (
                <div key={member.id} className="fade-in-up">
                  <ProfileCard
                    name={member.name}
                    title={member.bio || member.wing}
                    handle={member.name?.toLowerCase().replace(/\s+/g, "") || "coordinator"}
                    status={member.role}
                    contactText="Contact"
                    avatarUrl={member.image || "/gravity-logo.png"}
                    socials={{
                      linkedin: member.socials?.linkedin,
                      x: member.socials?.twitter,
                    }}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => console.log("Contact", member.name)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Members Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-2 text-center">
              <span className="text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#fff"
                    d="M224.3 128L139.7-12.9c-6.5-10.8-20.1-14.7-31.3-9.1L21.8 21.3C9.9 27.2 5.1 41.6 11 53.5l69.6 139.1C50.5 226.5 32.3 271.1 32.3 320c0 106 86 192 192 192s192-86 192-192c0-48.9-18.3-93.5-48.3-127.4l69.6-139.1c5.9-11.9 1.1-26.3-10.7-32.2l-86.7-43.4c-11.2-5.6-24.9-1.6-31.3 9.1zm30.8 142.5c1.4 2.8 4 4.7 7 5.1l50.1 7.3c7.7 1.1 10.7 10.5 5.2 16l-36.3 35.4c-2.2 2.2-3.2 5.2-2.7 8.3l8.6 49.9c1.3 7.6-6.7 13.5-13.6 9.9l-44.8-23.6c-2.7-1.4-6-1.4-8.7 0l-44.8 23.6c-6.9 3.6-14.9-2.2-13.6-9.9l8.6-49.9c.5-3-.5-6.1-2.7-8.3l-36.3-35.4c-5.6-5.4-2.5-14.8 5.2-16l50.1-7.3c3-.4 5.7-2.4 7-5.1l22.4-45.4c3.4-7 13.3-7 16.8 0l22.4 45.4z"
                  />
                </svg>
              </span>
              <span>Members</span>
            </h2>
            <div className="flex flex-wrap gap-8 justify-center">
              {regularMembers.map((member) => (
                <div key={member.id} className="fade-in-up">
                  <ProfileCard
                    name={member.name}
                    title={member.bio || member.wing}
                    handle={
                      member.name?.toLowerCase().replace(/\s+/g, "") || "member"
                    }
                    status={member.role}
                    contactText="Contact"
                    avatarUrl={member.image || "/placeholder-avatar.svg"}
                    socials={{
                      linkedin: member.socials?.linkedin,
                      // instagram: member.socials?.instagram,
                      x: member.socials?.twitter,
                    }}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => console.log("Contact", member.name)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 card-glow p-8 text-center slide-in-up">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-foreground/70 mb-6">
              Interested in joining Gravity? We're always looking for passionate
              members!
            </p>
            <MagicButton href="/contact" className="mx-auto w-48 md:w-56">
              Get in Touch
            </MagicButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function MembersPage() {
  return (
    <Suspense fallback={<div />}>
      <MembersContent />
    </Suspense>
  );
}
