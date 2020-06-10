import Vue from 'vue';
import { mount } from '@vue/test-utils';
import Input from '@/src/input/index.ts';

describe('Button', () => {
  describe(':props', () => {
    it(':value', () => {
      const wrapper = mount({
        render() {
          return <Input value={'text'} />;
        },
      });
      const inputElemWrapper = wrapper.find('input');
      expect(inputElemWrapper.element.value).toEqual('text');
    });

    it(':value(controlled)', async () => {
      const wrapper = mount({
        render() {
          return <Input value={'text'} />;
        },
      });
      const inputElemWrapper = wrapper.find('input');
      inputElemWrapper.setValue('text1');
      await Vue.nextTick();
      expect(inputElemWrapper.element.value).toEqual('text');
    });

    it(':default-value', async () => {
      const wrapper = mount({
        render() {
          return <Input default-value={'text'} />;
        },
      });
      const inputElemWrapper = wrapper.find('input');
      inputElemWrapper.setValue('text1');
      await Vue.nextTick();
      expect(inputElemWrapper.element.value).toEqual('text1');
    });

    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Input disabled={true} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':readonly', () => {
      const wrapper = mount({
        render() {
          return <Input readonly={true} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':autocomplete', () => {
      const wrapper = mount({
        render() {
          return <Input autocomplete={true} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':prefix-icon', () => {
      const wrapper = mount({
        render() {
          return <Input prefix-icon={'user'} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':suffix-icon', () => {
      const wrapper = mount({
        render() {
          return <Input suffix-icon={'user'} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Input size={'large'} />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('$attrs', () => {
    it('input attrs should pass to input element', () => {
      const wrapper = mount({
        render() {
          return <Input name="password" placeholder="please text" maxLength="20" type="password" />;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('@event', () => {
    it('@input', () => {
      const wrapper = mount(Input);
      const inputElemWrapper = wrapper.find('input');
      inputElemWrapper.setValue('text');
      expect(wrapper.emitted().input).toBeTruthy();
      expect(wrapper.emitted().input[0][0]).toBe('text');
    });

    it('@change', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Input onChange={fn} />;
        },
      });
      const inputWrapper = wrapper.find(Input);
      const inputElemWrapper = wrapper.find('input');
      inputElemWrapper.trigger('change');
      expect(inputWrapper.emitted().change).toBeTruthy();
      expect(fn).toBeCalled();
    });

    it('@focus', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Input onFocus={fn} />;
        },
      });
      const inputWrapper = wrapper.find(Input);
      const inputElemWrapper = wrapper.find('input');
      inputElemWrapper.trigger('focus');
      expect(inputWrapper.emitted().focus).toBeTruthy();
      expect(fn).toBeCalled();
    });

    it('@blur', () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Input onBlur={fn} />;
        },
      });
      const inputWrapper = wrapper.find(Input);
      const inputElemWrapper = wrapper.find('input');
      inputElemWrapper.trigger('blur');
      expect(inputWrapper.emitted().blur).toBeTruthy();
      expect(fn).toBeCalled();
    });
  });

  describe('methods', () => {
    it('focus', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Input onFocus={fn} />;
        },
      });
      const inputWrapper = wrapper.find(Input);
      inputWrapper.vm.focus();
      await Vue.nextTick();
      expect(inputWrapper.emitted().focus).toBeTruthy();
    });

    it('blur', async () => {
      const fn = jest.fn();
      const wrapper = mount({
        render() {
          return <Input onBlur={fn} />;
        },
      });
      const inputWrapper = wrapper.find(Input);
      inputWrapper.vm.focus();
      inputWrapper.vm.blur();
      await Vue.nextTick();
      expect(inputWrapper.emitted().blur).toBeTruthy();
    });
  });
});
