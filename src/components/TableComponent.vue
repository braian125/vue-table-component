<template>
  <div class="table-responsive">

    <div class="input-group mb-3 col-2 select-pagination" v-if="pagination">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">Records:</label>
      </div>
      <select class="custom-select" id="inputGroupSelect01" v-model="nRows" @change="setPages">
        <option value="5" selected>5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </div>

    <table id="general-table" class="table table-striped table-bordered table-vcenter">
      <thead>
        <tr>
          <slot name="label"></slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in displayed" :key="index">
          <template v-for="(field, _index) in fields">
            <td :key="_index" :class="$children[_index].$options.propsData.customClass">
              <template v-if="field">
                <template v-if="$children[_index].$options.propsData.filter">
                  {{ format(field.split('.').reduce((a, b) => a[b], row), $children[_index].$options.propsData.filter) }}
                </template>
                <template v-else>
                  {{ field.split('.').reduce((a, b) => a[b], row) }}
                </template>
              </template>

              <template v-if="!field">
                <div class="btn-container" v-if="actions[_index]">
                  <template v-for="(action, i) in actions[_index]">
                    <button
                      :class="action.class"
                      data-toggle="dropdown"
                      v-if="action.slot == 'icon'"
                      :key="i"
                      @click="clickEvent(row, action.attrs.slug)"
                      v-tooltip.top="action.attrs.tooltip"
                    >
                      <i :class="action.attrs.icon"></i>
                    </button>
                  </template>
                </div>
              </template>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <nav aria-label="..." class="mt-5" v-if="pagination">
      <ul class="pagination">
        <li class="page-item" v-bind:class="page != 1?'':'disabled'">
          <a class="page-link" @click="page--" tabindex="-1">Previous</a>
        </li>
        <li
          class="page-item"
          v-for="(pageNumber, index) in pages"
          :key="index"
          @click="page = pageNumber"
          v-bind:class="page == pageNumber?'active':''"
        >
          <a class="page-link">{{pageNumber}}</a>
        </li>
        <li class="page-item" v-bind:class="page < pages.length?'':'disabled'">
          <a class="page-link" @click="page++">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: "TableComponent",
  data: () => {
    return {
      page: 1,
      pages: [],
      fields: [],
      actions: [],
      nRows:null,
    };
  },
  props: {
    data: {
      default: () => [],type: [Array, Function]
    },
    pagination: {
      default: () => false, type: Boolean
    },
    perPage: {
      default: () => 25, type: Number
    }
  },
  computed: {
    displayed() {
      return this.paginate(this.data);
    }
  },
  methods: {
    clickEvent(row, slug) {
      this.$emit("click-event", row, slug);
    },
    format(value, filter) {
      return Vue.filter(filter)(value)
    },
    paginate(rows) {
      let page = this.page;
      let perPage = this.nRows;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return rows.slice(from, to);
    },
    setPages() {
      this.pages=[];
      let numberOfPages = Math.ceil(this.data.length / this.nRows);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    }
  },
  watch: {
    data() {
      this.setPages();
    }
  },
  mounted() {
    this.nRows=this.perPage;
    this.$slots.label.forEach((e, i) => {
    this.fields.push(e.data.attrs.value);
    if (
      e.componentOptions.children &&
        e.componentOptions.children.length > 0
      ) {
        this.actions[i] = [];
        e.componentOptions.children.forEach(_e => {
          this.actions[i].push(_e.data);
        });
      }
    });
    this.setPages();
    /*let el = this.scrollElement? this.scrollElement : window;
		$(el).scroll(() => {
			let height = this.scrollElement? $(this.scrollElement)[0].scrollHeight : document.documentElement.offsetHeight;
			let bottomOfWindow = $(el).scrollTop() + $(el).innerHeight() === height;
			if (bottomOfWindow) {
				console.log('llego')
			}
		});*/
  }
};

</script>
