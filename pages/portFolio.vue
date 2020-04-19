<template lang="pug">
.container
  article.resume-wrapper
    section.header
      .row
        .col-8
          h1 Promot Natemanee
          h4.green Software Engineer
          p.about-me A web developer with over 3 years of front end experience and passion for responsive website design, eager to learn new thing. Seeking to become the next Full stack developer, Frontend developer.
          .col-12.px-0
            b-button(
              variant="info"
              @click="downloadCV"
              ) Download CV

        .col
          .profile
            img(src="/img/art.jpg")
      hr
    section
      .row
        .col-7
          h3.title WORK EXPERIENCES
          h5.mt-3 Software Engineer

          .d-flex.justify-content-between.align-items-center.mb-3
            label 2 3 perspective, Bangkok
            label 12/2017 - Present
          ul
            li: p Spearheaded transition from LAMP stack to Backend and Frontend, reducing latency and increasing UX / UI effectiveness
            li: p oin Frontend team using Nuxt.js to implemented websites, and landing pages from concept through deployment
            li: p Collaborate with design team via Figma / Zeplin
            li: p Work with agile for planing, estimate time, create task and sub-task
            li: p Tracking analytics, do great SEO website
          .d-flex.justify-content-between.align-items-center.mb-3.mt-4

            label 2 3 perspective, Bangkok
            label 07/2016 - 12/2017
          ul
            li: p Developed small web application using LAMP stack PHP, jQuery.
            li: p Many projects made for campaign in social media.
            li: p Design and develop API for mobile.
            li: p Provided assistance to Customer Support when troubleshooting technical issues of clients.
        .col
          h3.title SKILLS
          h5.mt-3 Software Development
          p MVC, Object oriented, Functional programming, Agile, Scrum

          h5.mt-3 Technologies & Frameworks
          p Vue js, Vuex, Nuxt js, Bootstrap, Pug, Sass, Less, Docker, Gitlab CI /CD, Codeigniter, jQuery

          h5.mt-3 Programming Languages
          p Javascript, PHP, Java, HTML/CSS


          h3.title.mt-5 EDUCATION
          h5.mt-3 B.Eng Computer Engineering
          p Kasetsart University Kamphaeng Saen Campus | 05/2012 - 06/2016 (GPA 3.41)
          h5.mt-3 High School
          p Benchama Maharat School, Ubon Ratchatani | 06/2006 - 03/2012




</template>

<script>
export default {
  data() {
    return {
      ans: null
    };
  },

  mounted() {
    this.$axios.$get("/api/xyz").then(res => {
      this.ans = res;
    });
  },

  methods: {
    downloadCV() {
      window.open("/ResumeArt.pdf", "_blank");
    }
  }
};
</script>

<style lang="scss" scoped>
$color-green: #54b689;

.green {
  color: $color-green;
}

h5 {
  font-weight: bold;
}

.title {
  font-weight: bold;
  color: $color-green;
  position: relative;
  padding-left: 20px;
  &:before {
    content: "";
    display: inline-block;
    width: 5px;
    height: 100%;
    background: $color-green;
    position: absolute;
    left: 0;
    top: 0;
  }
}

.resume-wrapper {
  padding: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.025);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  margin-bottom: 50px;

  .header {
    h1 {
      font-style: cap;
      color: $color-green;
    }
    .profile {
      text-align: right;
      img {
        border-radius: 10px;
        width: 200px;
      }
    }
  }
}
</style>
