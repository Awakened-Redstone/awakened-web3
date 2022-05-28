<template>
  <div class="page">
    <div v-if="!loaded">Loading...</div>
    <div v-if="loaded && !found">
      Not found!
    </div>
    <div v-if="!isFile && loaded">
      <NuxtLink v-for="path in paths" :key="path" :to="path">
        {{ path }}
        <br/>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isFile: false,
      paths: [],
      found: true,
      loaded: false
    }
  },
  watch: {
    '$route.path': {
      async handler() {
        await this.setList()
      },
    },
  },
  async fetch() {
    await this.setList()
  },
  methods: {
    async setList() {
      try {
        const [mavenData] = (
          await Promise.all([
            this.$axios.get(`https://maven.awakenedredstone.com/`)
          ])
        ).map((it) => it.data)

        this.isFile = !mavenData.type;
        if (mavenData.type) this.paths = mavenData.content;
        this.loaded = true;
      } catch {
        this.isFile = true;
        this.paths = [];
        this.found = false;
        this.loaded = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  max-width: 1280px;
  margin: 0 auto;
  background-color: var(--color-raised-bg);
  border-radius: var(--size-rounded-card);
  padding: 1rem;

  a {
    font-family: monospace;
    text-decoration-line: underline;
    text-decoration-color: rgb(51, 145, 255);
    color: rgb(51, 145, 255);
  }

  .cover {
    img {
      border-radius: var(--size-rounded-card);
      width: 100%;
      height: 40rem;
      object-fit: cover;
      object-position: 15% 12.5%;
      @media screen and (max-width: 1280px) {
        border-radius: 0;
      }
    }

    .text {
      position: absolute;
      top: calc(5rem + var(--size-navbar-height));
      max-width: 30rem;
      text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
      padding-left: 6rem;
      color: #fff;

      h1 {
        color: #fff;
        margin: 1rem 0;
        font-size: var(--font-size-2xl);
      }

      h3 {
        color: #fff;
        font-size: var(--font-size-lg);
        font-weight: normal;
        margin-bottom: 1rem;

        a {
          text-decoration: underline;
        }
      }

      form {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.25rem;
        box-sizing: border-box;

        input {
          box-sizing: content-box;
        }
      }

      @media screen and (max-width: 750px) {
        padding: 1rem;
      }
    }
  }

  .points {
    border-radius: 0;
    padding: var(--spacing-card-lg);
    margin-top: 1rem;

    .point {
      display: flex;
      align-items: center;
      flex-direction: column-reverse;
      margin-bottom: 1rem;

      &.left {
        flex-direction: column;
      }

      .text-container {
        .subheader {
          margin: 0;
          color: var(--color-brand);
        }

        a {
          text-decoration: underline;
        }

        .features {
          display: flex;
          flex-wrap: wrap;
          row-gap: 1rem;

          .feature {
            width: 100%;
            display: flex;
            align-items: flex-start;

            p {
              margin: 0;
              line-height: 1.5rem;
            }

            svg {
              min-width: 1.5rem;
              height: 1.5rem;
              margin-right: 0.5rem;
            }

            &.completed {
              svg {
                color: var(--color-brand);
              }
            }

            &.in-progress {
              svg {
                color: var(--color-badge-yellow-text);
              }
            }
          }
        }
      }

      .image {
        display: none;
        padding: 2rem;

        svg {
          color: var(--color-brand);
          width: 36rem;
          height: unset;
        }

        img,
        video {
          border-radius: var(--size-rounded-lg);
          width: 40rem;
        }

        .terminal {
          display: flex;
          padding: 0.5rem 1rem;
          border-radius: var(--size-rounded-lg);
          background-color: var(--color-code-bg);
          font-family: monospace;
          font-size: 80%;
          line-height: 1.5rem;

          .line-nums {
            display: flex;
            flex-direction: column;
            padding: 0.5rem;
            color: var(--color-icon);
          }

          .text {
            padding: 0.5rem;

            .command {
              color: var(--color-brand);
            }

            pre {
              margin: 0;
              padding: 0;
              border-radius: 0;
              overflow-y: hidden;
              background-color: var(--color-code-bg);

              code {
                padding: 0;
                border-radius: 0;
                background-color: var(--color-code-bg);
                color: var(--color-code-text);
              }
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 500px) {
    .points {
      .point {
        .text-container {
          .features {
            .feature {
              width: 50%;
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: 750px) {
    .points {
      .point {
        margin-bottom: 0;

        .image {
          display: block;
        }
      }
    }
  }
  @media screen and (min-width: 1200px) {
    .points {
      border-radius: var(--size-rounded-card);

      .point {
        flex-direction: row;

        &.left {
          flex-direction: row;

          .text-container {
            padding-left: 3rem;
            padding-right: 0;
          }
        }

        .text-container {
          width: 60%;
          padding-right: 3rem;

          .features {
            .feature {
              width: 33%;
            }
          }
        }
      }
    }
  }
}
</style>
