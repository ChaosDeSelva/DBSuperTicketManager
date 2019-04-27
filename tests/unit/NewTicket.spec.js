import BootstrapVue from 'bootstrap-vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import NewTicket from '@/components/NewTicket.vue';

jest.mock('@/store/modules/tickets/getters.js');

describe('NewTicket.vue', () => {
  const localVue = createLocalVue();
  localVue.use(BootstrapVue);

  const stubs = ['FontAwesomeIcon'];

  // Render the component
  const wrapper = shallowMount(NewTicket, {
    localVue,
    stubs,
    data() {
      return {
        newTicketTitle: 'abc',
        errors: ['It\'s the end of the world as we know it', ' and I feel fine'],
      };
    }, // data
  });

  it('Header text is visible', () => {
    expect(wrapper.find('[data-test="new-ticket-header"]').text()).toEqual('Create New Ticket');
  });

  it('Title text data binding', () => {
    expect(wrapper.find('#ticket-title').element.value).toBe('abc');
  });

  it('Error message is visible', () => {
    expect(wrapper.find('.error').exists()).toBe(true);
  });

  it('Error message shows multiple messages', () => {
    expect(wrapper.findAll('.error').wrappers.length).toBe(2);
  });

  it('Error message shows multiple messages', () => {
    const outcome = wrapper.vm.validateTicketTitle(null);
    expect(Object.prototype.hasOwnProperty.call(outcome, 'error')).toBe(true);
  });

  it('should match the snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot(); // TODO
  });
});
