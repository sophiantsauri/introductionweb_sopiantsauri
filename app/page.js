"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ABOUT =
  "Saya Freshgraduate S1 Informatika - Universitas Gunadarma yang suka mengubah data dan ide jadi tampilan yang bisa dipakai. Terbiasa dengan React, PHP, dan SQL, dan sekarang lagi serius mendalami front-end, animasi, dan detail kecil yang bikin web terasa hidup.";

const PROJECTS = [
  { name: "ControlHub", stack: "React, Recharts", desc: "Dashboard untuk memantau progres proyek lewat grafik yang interaktif." },
  { name: "DigiArchive", stack: "PHP, MySQL", desc: "Sistem surat dan arsip digital supaya dokumen gampang dicari dan dilacak." },
  { name: "Operational Performance Analytics", stack: "Power BI, DAX", desc: "Dashboard kinerja operasional dengan ukuran yang dihitung lewat DAX." },
  { name: "Reporting System", stack: "Excel, Power Query", desc: "Pelaporan manajemen dan operasional yang dirapikan dengan PivotTable." },
  { name: "AI Chatbot", stack: "Web app, Python", desc: "Aplikasi web chatbot dengan backend Python." },
];

const SKILLS = ["React", "Next.js", "GSAP", "JavaScript", "PHP", "Laravel", "SQL", "Power BI", "Figma", "Git"];

const LINKS = [
  { label: "Email", href: "mailto:sophian.tsauri02@gmail.com" },
  { label: "GitHub", href: "https://github.com/sophiantsauri" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sopian-tsauri-3000bb38b/" },
];

export default function Home() {
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const fine = window.matchMedia("(pointer: fine)").matches;
    const q = (s) => root.current.querySelector(s);

    let cleanupCursor = () => {};
    if (fine) {
      const cur = q(".cursor");
      const mx = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3" });
      const my = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3" });
      const move = (e) => { mx(e.clientX); my(e.clientY); };
      const over = (e) => cur.classList.toggle("big", !!e.target.closest("[data-hover]"));
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseover", over);
      cleanupCursor = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseover", over);
      };
    }

    const mags = [...root.current.querySelectorAll("[data-magnet]")];
    const magCleanups = mags.map((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.3 });
      };
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero-title-anim", { yPercent: 115, rotate: 6, duration: 1.1, ease: "power4.out", delay: 0.15 });
      gsap.from(".hero-sub", { opacity: 0, y: 24, duration: 0.9, delay: 1.0 });
      gsap.from(".hero-video", { opacity: 0, y: 40, duration: 1, delay: 0.8 });

      gsap.to(root.current, {
        "--bg": "rgb(16,25,31)", "--fg": "rgb(232,238,240)", ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true },
      });

      const km = q(".km-num"), fill = q(".km-fill");
      ScrollTrigger.create({
        start: 0, end: "max",
        onUpdate: (s) => { fill.style.transform = `scaleY(${s.progress})`; km.textContent = (s.progress * 10).toFixed(1); },
      });

      gsap.fromTo(".w", { opacity: 0.15 }, {
        opacity: 1, stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: ".about", start: "top 70%", end: "bottom 60%", scrub: true },
      });

      const track = q(".track-x");
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: { trigger: ".work", pin: true, scrub: 1, end: () => "+=" + track.scrollWidth, invalidateOnRefresh: true },
      });

      const loop = gsap.to(".marq", { xPercent: -50, repeat: -1, ease: "none", duration: 22 });
      ScrollTrigger.create({
        onUpdate: (s) => { gsap.killTweensOf(loop); loop.timeScale(1 + Math.min(Math.abs(s.getVelocity()) / 250, 8)); },
      });
      ScrollTrigger.addEventListener("scrollEnd", () => gsap.to(loop, { timeScale: 1, duration: 0.8 }));
    });

    return () => {
      mm.revert();
      cleanupCursor();
      magCleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <main ref={root} className="page">
      <div className="cursor" aria-hidden="true" />

      <aside className="run" aria-hidden="true">
        <span className="km-num">0.0</span><span className="km-unit">km</span>
        <div className="km-line"><div className="km-fill" /></div>
      </aside>

      <section className="hero">
        <div className="hero-text">
          <h1>
            <span className="line">
              <span className="ch hero-title-anim inline-block">Sopian Tsauri</span>
            </span>
          </h1>
          <p className="hero-sub">Front-end developer yang masih terus berlari. Scroll buat ikut lari.</p>
        </div>

        <figure className="hero-video">
          <video src="/video/video_perkenalan_sopian_tsauri.mp4" controls playsInline preload="metadata" />
          <figcaption>
            Sumber video:{" "}
            <a href="https://vt.tiktok.com/ZSpfQdtwG/" target="_blank" rel="noreferrer" data-hover>
              Lihat di TikTok
            </a>
          </figcaption>
        </figure>
      </section>

      <section className="about">
        <p>{ABOUT.split(" ").map((w, i) => <span className="w" key={i}>{w} </span>)}</p>
      </section>

      <section className="work">
        <h2 className="work-title">Proyek di sepanjang rute</h2>
        <div className="track-x">
          {PROJECTS.map((p) => (
            <article className="card" key={p.name} data-hover>
              <span className="stack">{p.stack}</span>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="skills" aria-label="Skill">
        <div className="marq">
          {[...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS].map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </section>

      <section className="contact">
        <h2>Garis finish, tapi bukan akhir.</h2>
        <div className="links">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" data-magnet data-hover>{l.label}</a>
          ))}
        </div>
      </section>
    </main>
  );
}