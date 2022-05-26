<template>
  <button class="project-card card" :aria-label="name" role="listitem" @click="clickEvent()">
    <div class="columns">
      <div class="icon">
        <div>
          <!-- TODO: Change the link -->
          <img :src="iconUrl || 'https://cdn.modrinth.com/placeholder.svg?inline'"
               :alt="name"
               loading="lazy"
          />
        </div>
      </div>
      <div class="card-content">
        <div class="info">
          <div class="top">
            <h2 class="title">
              {{ name }}
            </h2>
          </div>
          <div class="side-type">
            <div v-if="clientSide === 'optional' && serverSide === 'optional'" class="side-descriptor">
              <InfoIcon aria-hidden="true"/>
              Universal {{ type }}
            </div>
            <div
              v-else-if="
                (clientSide === 'optional' || clientSide === 'required') &&
                (serverSide === 'optional' || serverSide === 'unsupported')"
              class="side-descriptor">
              <InfoIcon aria-hidden="true"/>
              Client {{ type }}
            </div>
            <div
              v-else-if="
                (serverSide === 'optional' || serverSide === 'required') &&
                (clientSide === 'optional' || clientSide === 'unsupported')"
              class="side-descriptor">
              <InfoIcon aria-hidden="true"/>
              Server {{ type }}
            </div>
          </div>
          <p v-highlightjs class="description markdown-body" v-html="$xss($md.render(description))"/>
        </div>
      </div>
    </div>
  </button>
</template>

<script>
import InfoIcon from '~/assets/images/utils/info.svg?inline'

export default {
  name: 'ProjectCard',
  components: {
    InfoIcon
  },
  props: {
    link: {
      type: String,
      default: '',
      required: false
    },
    id: {
      type: String,
      default: 'mod-0',
    },
    type: {
      type: String,
      default: 'mod',
    },
    name: {
      type: String,
      default: 'Project Name',
    },
    author: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: 'A card description',
    },
    iconUrl: {
      type: String,
      default: '',
      required: false,
    },
    downloads: {
      type: String,
      default: null,
      required: false,
    },
    follows: {
      type: String,
      default: null,
      required: false,
    },
    createdAt: {
      type: String,
      default: '0000-00-00',
    },
    updatedAt: {
      type: String,
      default: null,
    },
    categories: {
      type: Array,
      default() {
        return []
      },
    },
    status: {
      type: String,
      default: null,
    },
    serverSide: {
      type: String,
      required: false,
      default: '',
    },
    clientSide: {
      type: String,
      required: false,
      default: '',
    },
    clickEvent: {
      type: Function,
      required: false,
      default: () => {},
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
button {
  padding: 0;
}

.columns {
  width: 100%;
}

.project-card {
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.12), 0 0 12px rgba(0, 0, 0, 0.24);
  transition-duration: 300ms;
  transition-timing-function: ease;
  transition-property: box-shadow, transform;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  padding: var(--spacing-card-bg);
  margin-left: 10px;
  margin-right: 10px;
  width: calc(100% - 10px);

  &:hover {
    box-shadow: 0 0 23px rgba(0, 0, 0, 0.23), 0 0 10px rgba(0, 0, 0, 0.19);
    transform: scale(1.01);
    transition-duration: 300ms;
    transition-timing-function: ease;
    transition-property: box-shadow, transform;
  }

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    margin: 5px;
    width: calc(100% / 3 - 10px);
  }

  .icon {
    img {
      width: 6rem;
      height: 6rem;
      margin: 0 var(--spacing-card-md) 0 0;
      border-radius: var(--size-rounded-icon);
      object-fit: contain;
    }
  }

  .card-content {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;

    .info {
      display: flex;
      flex-direction: column;

      .top {
        align-items: baseline;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        flex-shrink: 0;
        margin-right: var(--spacing-card-md);

        .title {
          margin: 0 0.5rem 0 0;
          overflow-wrap: anywhere;
          color: var(--color-text-dark);
          font-size: var(--font-size-xl);
        }

        .author {
          margin: auto 0 0 0;
          color: var(--color-text);
        }
      }

      .side-descriptor {
        display: flex;
        align-items: center;
        font-weight: bolder;
        font-size: var(--font-size-sm);

        margin-top: 0.125rem;
        margin-bottom: 0.5rem;

        svg {
          width: auto;
          height: 1rem;
          margin-right: 0.125rem;
        }
      }

      .description {
        margin: var(--spacing-card-sm) var(--spacing-card-md) var(--spacing-card-sm) 0;
      }

      .versions {
        display: flex;
        margin-top: auto;

        .version {
          line-height: 24px;
          width: fit-content;
          border-radius: 8px;
          background-color: var(--color-badge-green-bg);
          color: var(--color-text-dark);
          padding: 0 8px;
          margin-right: 6px;
        }
      }
    }

    .right-side {
      min-width: 12rem;
      text-align: right;

      .stat {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;

        svg {
          width: auto;
          height: 1.25rem;

          margin-left: auto;
          margin-right: 0.25rem;
        }

        p {
          margin: 0;

          strong {
            font-weight: bolder;
            font-size: var(--font-size-lg);
          }
        }
      }

      .status {
        margin-bottom: 0.5rem;
      }

      .buttons {
        display: flex;
        flex-direction: column;

        button,
        a {
          margin-right: 0;
          margin-left: auto;
          margin-bottom: 0.5rem;
        }
      }
    }
  }

  .left-categories {
    display: none;
  }

  @media screen and (max-width: 560px) {
    .card-content {
      flex-direction: column;

      .info {
        .dates {
          .date {
            margin-bottom: 0.5rem;
          }
        }
      }

      .right-side {
        padding-top: var(--spacing-card-sm);

        text-align: left;

        .stat svg {
          margin-left: 0;
        }

        .buttons button,
        a {
          margin-left: unset;
          margin-right: unset;
        }
      }
    }

    .left-categories {
      display: flex;
      margin: 0 0 0.75rem 0.75rem;
      width: 7rem;
    }

    .right-categories {
      display: none;
    }
  }
}
</style>
