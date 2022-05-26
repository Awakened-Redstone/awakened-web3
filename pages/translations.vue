<template>
  <div class="page">
    <input
      id="search"
      v-model="query"
      type="search"
      name="search"
      placeholder="Search..."
      autocomplete="off"
      :disabled="langList ? false : true"
      @input="onSearchChange()"
    />
    <div style="display: flex; flex-wrap: wrap; flex-shrink: 0; flex-grow: 0">
      <GeneralCard
        v-if="langList.length == langs.length"
        key="global"
        name="Global"
        icon-url=""
        description="<u>Translations for all languages</u>"
        :click-event="() => this.$notify({ group: 'main', title: 'Not implemented', text: 'This feature isn\'t yet implemented', type: 'error' })"
      />
      <GeneralCard
        v-for="lang in langList"
        :key="lang.id"
        :name="lang.name"
        :icon-url="lang.id === 'enws' ?
        'https://crowdin-static.downloads.crowdin.com/images/custom_flags/big/15221674_enws.png' :
        require(`~/assets/images/crowdin_flags/${lang.id}.png`)"
        :description="`Translations for <u>\`${lang.locale.toLowerCase()}.json\`</u>`"
        :click-event="() => createResourcePack({id: lang.id, crowdinLocale: lang.locale, locale: lang.locale.toLowerCase(), name: lang.name})"
      />
    </div>
  </div>
</template>

<script>
import JSZip from "jszip";

export default {
  async asyncData(data) {
    try {
      const [langs] = (
        await Promise.all([
          data.$axios.get(`/crowdin/languages?project=508978`)
        ])
      ).map((it) => it.data)

      // TODO: concat en-us to langs
      langs.push({
        'id': 'en',
        'name': 'English, United States',
        'twoLettersCode': 'en',
        'threeLettersCode': 'eng',
        'locale': 'en-US',
        'textDirection': 'ltr',
        'dialectOf': 'en'
      })
      langs.sort(function (a, b) {
        const nameA = a.id.toLowerCase();
        const nameB = b.id.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      const langList = langs;

      return {
        selectedProjectType: 'all',
        langs,
        langList
      }
    } catch (e) {
      data.error({
        statusCode: 500,
        message: e,
      })
    }
  },
  data() {
    return {
      query: '',
      runningDownloads: [],
    }
  },
  methods: {
    onSearchChange() {
      if (this.query === null) this.langList = this.langs;
      this.langList = this.langs.filter(word => word.name.toLowerCase().includes(this.query.toLowerCase()) || word.locale.toLowerCase().includes(this.query.toLowerCase()));
    },
    async createResourcePack(lang) {

      if (this.runningDownloads.includes(lang.id)) {
        this.$notify({
          group: 'main',
          title: 'Already downloading',
          text: `Download for "${lang.name}" is already running`,
          type: 'error',
        });
        return;
      }

      this.runningDownloads.push(lang.id);
      const index = this.runningDownloads.indexOf(lang.id);

      try {
        this.$notify({
          group: 'main',
          title: 'Starting',
          text: `Starting download for "${lang.name}"`,
          type: 'success',
        });

        const [zipData] = (
          await Promise.all([
            this.$axios.get(`/crowdin/download?project=subathon-mod&lang=${lang.id}`, {responseType: 'blob'})
          ])
        ).map((it) => it.data)

        const zip = new JSZip();
        const langFile = await (await JSZip.loadAsync(zipData)).file(`${lang.crowdinLocale}.json`)
        if (!langFile) {
          if (index !== -1) this.runningDownloads.splice(index, 1);
          this.$notify({
            group: 'main',
            title: 'Failed to download',
            text: `Could not get file "${lang.locale}.json"`,
            type: 'error',
          });
          return;
        }
        const crowdinData = await langFile.async('text');

        const mcmeta = {
          "pack": {
            "pack_format": 8,
            "description": `Subathon translations (${lang.locale})`
          }
        }

        zip.file("pack.mcmeta", JSON.stringify(mcmeta, null, 4));
        const folder = zip.folder(`assets/subathon/lang`);
        folder.file(`${lang.locale}.json`, JSON.stringify(JSON.parse(crowdinData), null, 4));
        zip.generateAsync({type: "blob"}).then(function (content) {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(content);
          link.download = `${lang.name}.zip`;
          link.click();
          URL.revokeObjectURL(link.href);
        });

        this.$notify({
          group: 'main',
          title: 'Complete',
          text: `Download of "${lang.name}.zip" complete`,
          type: 'success',
        });

        if (index !== -1) this.runningDownloads.splice(index, 1);
      } catch (e) {
        if (index !== -1) this.runningDownloads.splice(index, 1);
        this.$notify({
          group: 'main',
          title: 'An error occurred',
          text: e,
          type: 'error',
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  max-width: 1280px;
  margin: 0 auto;
  @media screen and (min-width: 500px) {
  }
  @media screen and (min-width: 750px) {
  }
  @media screen and (min-width: 1200px) {
  }
}

.markdown-body {
  max-width: calc(100% - (2 * var(--spacing-card-lg)));
}
</style>
