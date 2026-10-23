/*
 * 主页内容集中在这里填写，保存后刷新网页即可。
 * 段落支持 **加粗** 和 [链接文字](https://example.com)。
 * 空数组对应的栏目会自动隐藏；未填写的链接不会显示。
 * 原始填写示例保存在 backups/before-content-personalization/content.js。
 */
window.HOMEPAGE = {
  language: "en",
  profile: {
    name: "Qion Qiyuan YANG",
    position: "Master's Student",
    department: "Artificial Intelligence",
    institution: "University of Macau",
    email: "qy.yang336@connect.um.edu.mo",
    photo: "./assets/qiyuan-yang-avatar.jpg",
    photoAlt: "Avatar of Qiyuan YANG",
    description: "Qion Qiyuan YANG, a master's student in Artificial Intelligence at the University of Macau, expected to graduate in 2028. Research interests: trustworthy LLMs, multimodal LLMs, and LLM post-training.",
    links: [
      { label: "GitHub", icon: "github", url: "https://github.com/xiumu33" },
      { label: "Kaggle", icon: "kaggle", url: "https://www.kaggle.com/xiumu33" },
      { label: "Google Scholar", icon: "scholar", url: "" },
      { label: "LinkedIn", icon: "linkedin", url: "" },
      { label: "CV", icon: "document", url: "" },
    ],
  },
  biography: [
    "Hi! I'm Qiyuan YANG, a master's student in Artificial Intelligence at the University of Macau, advised by [Prof. Hou Pong (Ken) Chan](https://kenchan0226.github.io/). I expect to graduate in 2028.",
    "Previously, I worked as a research assistant at the Shenzhen Institute of Advanced Integration Technology, Shenzhen Institutes of Advanced Technology (SIAT), Chinese Academy of Sciences, from 2025 to 2026. I received my bachelor's degree in Software Engineering from Hohai University in 2025, where I studied from 2021 to 2025.",
    "My research interests include **trustworthy large language models (LLMs)**, **multimodal large language models (MLLMs)**, and **LLM post-training**.",
  ],

  // 后续通过问答补充这些栏目；填入内容后会自动显示。
  news: [],
  projects: [],
  publications: [], // 暂无论文时保持为空；不要直接在数组里填写提示文字。
  preprints: [],
  education: [
    {
      date: "Present",
      text: "Master's studies in Artificial Intelligence, **University of Macau** (expected graduation: 2028). Advisor: [Prof. Hou Pong (Ken) Chan](https://kenchan0226.github.io/).",
    },
    {
      date: "2021 – 2025",
      text: "Bachelor's degree in Software Engineering, **Hohai University**.",
    },
  ],
  experience: [
    {
      date: "2025 – 2026",
      text: "**Research Assistant**, [Shenzhen Institute of Advanced Integration Technology](https://siait.siat.ac.cn/), [Shenzhen Institutes of Advanced Technology (SIAT)](https://english.siat.ac.cn/), Chinese Academy of Sciences.",
    },
  ],
  awards: [
    {
      date: "2026",
      text: "🥈 **Silver Medal** — [The Pokémon Company - PTCG AI Battle Challenge Simulation](https://www.kaggle.com/competitions/pokemon-tcg-ai-battle/). Ranked **184th out of 6,807 teams**.",
    },
    { date: "AY 2022", text: "**National Endeavor Scholarship**." },
  ],
  headings: {
    biography: "Biography",
    news: "News",
    projects: "Selected Projects",
    publications: "Publications",
    preprints: "Preprints",
    education: "Education",
    experience: "Research Experience",
    awards: "Honors & Awards",
    service: "Professional Activities",
    teaching: "Teaching",
  },
  publicationNote: "(* indicates equal contribution)",
  updatedAt: "October 2026",
};

