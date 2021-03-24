<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup() {

  },
  render(h: any, context: any) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(`<svg-icon icon-class={icon} />`)
    }

    if (title) {
      vnodes.push(`<span slot='title'>{title}</span>`)
    }
    return vnodes
  }
})
</script>
