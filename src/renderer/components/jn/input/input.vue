<template>
  <div :class="[
    {
      'is-disabled': disabled,
      'Jn-input-group': $slots.prepend || $slots.append,
      'Jn-input-group--append': $slots.append,
      'Jn-input-group--prepend': $slots.prepend
    }
  ]">
    <template>
      <!-- 前置元素 -->
      <div class="Jn-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <!-- input 图标 -->
      <slot name="icon">
        <i class="Jn-input__icon"
          :class="[
            'Jn-icon-' + icon,
            onIconClick ? 'is-clickable' : ''
          ]"
          v-if="icon"
          @click="handleIconClick">
        </i>
      </slot>
      <input
        v-if="type !== 'textarea'"
        class="Jn-input__inner"
        v-bind="$props"
        :autocomplete="autoComplete"
        :value="currentValue"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <!-- <i class="Jn-input__icon Jn-icon-loading" v-if="validating"></i> -->
      <!-- 后置元素 -->
      <div class="Jn-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'JnInput',

    componentName: 'JnInput',

    data() {
      return {
        currentValue: this.value,
        textareaCalcStyle: {}
      };
    },

    props: {
      value: [String, Number],
      placeholder: String,
      readonly: Boolean,
      autofocus: Boolean,
      icon: String,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      name: String
    },

    computed: {
    },

    watch: {
    },

    methods: {
      handleBlur(event) {
      },
      handleFocus(event) {
      },
      handleInput(event) {
      }
    },
    created() {
    },

    mounted() {
    }
  };
</script>
