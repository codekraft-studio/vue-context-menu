<template>
  <div id="app">

    <div class="container">
      <header class="header">
        <div class="navbar-brand">
          <img alt="Vue logo" src="./assets/logo.png">
        </div>

        <div class="navbar-brand-name">
          <h1 class="title">Vue Context Menu</h1>
          <h2 class="subtitle">
            <strong>functional</strong> and <strong>customizable</strong> context menu for Vue
          </h2>
        </div>
      </header>
    </div>

    <main class="container">
      <div class="demo-container">
        <div v-if="currentItem" class="field is-horizontal edit">
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="text" v-model="currentItem.name" placeholder="Enter box name">
              </p>
            </div>
            <div class="field">
              <p class="control">
                <span class="select">
                  <select v-model="currentItem.color">
                    <option v-for="(color, index) in colors" :key="index" :value="color" v-text="color"></option>
                  </select>
                </span>
              </p>
            </div>

            <div class="field is-grouped is-grouped-right">
              <p class="control">
                <a class="button is-primary" @click="currentItem = null">
                  Close
                </a>
              </p>
            </div>
          </div>
        </div>
        <div class="demo" @contextmenu.self="$refs.ContainerMenu.open">
          <li v-for="(item, index) in items" :key="index" @contextmenu="$refs.ListMenu.open($event, {
            item,
            index
          })" :style="{
            backgroundColor: item.color
            }">
            <span>{{item.name}}</span>
          </li>
        </div>
      </div>
    </main>

    <VueContextMenu ref="ContainerMenu">
      <ul>
        <li @click="addItem">Add new item</li>
        <li @click="clearItems">Clear all items</li>
      </ul>
    </VueContextMenu>

    <VueContextMenu ref="ListMenu">
      <template slot-scope="{contextData}">
        <ul v-if="contextData.item">
          <li @click="onEditClick(contextData.item)">Edit {{contextData.item.name}}</li>
          <li @click="onRemoveClick(contextData.item, contextData.index)">Remove {{contextData.item.name}}</li>
        </ul>
      </template>
    </VueContextMenu>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Made with love by <a href="#">Codekraft Studio</a>.
          This project is released under <a href="#">MIT License</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      currentItem: null,
      colors: [
        'blueviolet',
        'hotpink',
        'aquamarine',
        'cadetblue',
        'coral',
        'cornflowerblue',
        'crimson',
        'darkcyan',
        'darkseagreen',
        'darkslategray',
        'deeppink',
        'deepskyblue',
        'violet',
        'turquoise',
        'tomato'
      ],
      items: []
    }
  },
  methods: {
    addItem () {
      const rndColor = this.colors[Math.floor(Math.random()*this.colors.length)]
      this.items.push({
        name: rndColor,
        color: rndColor
      })
    },
    clearItems () {
      this.items = []
    },
    onEditClick (data) {
      this.currentItem = data
    },
    onRemoveClick (data, index) {
      this.items.splice(index, 1)
      if (this.currentItem === data) {
        this.currentItem = null
      }
    }
  },
  created () {
    for (let i = 0; i < 8; i++) {
      const rndColor = this.colors[Math.floor(Math.random()*this.colors.length)]
      this.items.push({
        name: rndColor,
        color: rndColor
      })
    }
  }
}
</script>

<style lang="scss">
html,body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;

  header {
    align-items: center;
    display: flex;
    padding: 15px 0;
    text-align: left;
    a, strong {
      color: #41b883;
    }
    .navbar-brand img {
      height: 64px;
      margin-right: 20px;
      width: 64px;
    }
  }

  .vue-context-menu {
    ul {
      margin: 0px;
      padding: 0;
      list-style: none;
    }

    li {
      padding: 12px 16px;
      list-style: none;
      &:hover {
        background-color: #41b883;
        color: white;
        cursor: pointer;
      }
    }
  }
}

main.container {
  margin: 40px auto;
}

.demo-container {
  .edit {
    margin-bottom: 16px;
  }
  .demo {
    padding: 25px;
    background-color: #eee;
    border: thin solid #ccc;
    list-style: none;
    display: flex;
    margin: 0;
    width: 100%;
    min-height: 150px;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      border-radius: 6px;
      transition: all 500ms ease-in-out;
      background-color: lightgray;
      flex-grow: 1;
      display: flex;
      margin: 10px;
      min-height: 150px;
      min-width: 150px;
      max-height: 250px;
      padding: 15px 20px;
      box-sizing: border-box;
      text-align: center;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
}
</style>
