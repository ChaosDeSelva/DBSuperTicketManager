import Vuex, { mapActions } from 'vuex';
// import sinon from 'sinon';
import BootstrapVue from 'bootstrap-vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import NewTicket from '@/components/NewTicket.vue';
// import actions from '@/store/modules/tickets/actions';
import mutations from '@/store/modules/tickets/mutations';
import getters from '@/store/modules/tickets/getters';
import VueRouter from 'vue-router';
import router from '@/router';

// jest.mock('@/store/modules/tickets/actions.js');

describe('NewTicket.vue', () => {
  const localVue = createLocalVue();
  localVue.use(BootstrapVue);
  localVue.use(Vuex);
  localVue.use(VueRouter);

  const stubs = ['FontAwesomeIcon'];

  let wrapper;
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      newTicket: jest.fn(() => Promise.resolve()),
    };

    store = new Vuex.Store({
      router,
      actions,
      getters,
      mutations,
      state: {
        tickets: [],
      },
    });

    // Render the component
    wrapper = shallowMount(NewTicket, {
      methods: {
        ...mapActions({
          newTicket: jest.fn(() => Promise.resolve()),
        }),
      },
      stubs,
      store,
      localVue,
      data() {
        return {
          newTicketTitle: 'abc',
          errors: ['It\'s the end of the world as we know it', ' and I feel fine'],
        };
      }, // data
    });
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

  it('Error from null title', () => {
    const outcome = wrapper.vm.validateTicketTitleCharacterSize(null);
    expect(Object.prototype.hasOwnProperty.call(outcome, 'error')).toBe(true);
  });

  it('Error from whitespace empty title', () => {
    const outcome = wrapper.vm.validateTicketTitleCharacterSize('   ');
    expect(Object.prototype.hasOwnProperty.call(outcome, 'error')).toBe(true);
  });

  it('Error too long of text', () => {
    const outcome = wrapper.vm.validateTicketTitleCharacterSize('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');
    expect(Object.prototype.hasOwnProperty.call(outcome, 'error')).toBe(true);
  });

  it('Valid Title Text, pass validation', () => {
    const outcome = wrapper.vm.validateTicketTitleCharacterSize('Passing');
    expect(Object.prototype.hasOwnProperty.call(outcome, 'error')).toBe(false);
  });

  it('Error finding valid status', () => {
    const outcome = wrapper.vm.getTodoStatusId('undefined');
    expect(Object.prototype.hasOwnProperty.call(outcome, 'error')).toBe(true);
  });

  it('Valid status found', () => {
    const outcome = wrapper.vm.getTodoStatusId({ id: 'test' });
    expect(Object.prototype.hasOwnProperty.call(outcome, 'error')).toBe(false);
  });

  it('Ticket title already exists', () => {
    const outcome = wrapper.vm.validateTicketTitleExistInStore('Demo');
    expect(Object.prototype.hasOwnProperty.call(outcome, 'error')).toBe(true);
  });

  it('Ticket title does not already exists', () => {
    const outcome = wrapper.vm.validateTicketTitleExistInStore('');
    expect(Object.prototype.hasOwnProperty.call(outcome, 'error')).toBe(false);
  });

  it('Add ticket, no errors', () => {
    //  TODO
    // wrapper.vm.addTicket('', { id: 123, name: 'a', alias: 'b' });
    // expect(actions.newTicket.calledOnce).toBe(true);
  });

  it('Dispatch ticket, no errors', () => {
    //  TODO
    // wrapper.vm.dispatchTicket();
    // expect(wrapper.vm.dispatchTicket.calledOnce).toBe(true);
  });

  it('Commit a new ticket', () => {
    expect(store.state.tickets.length).toBe(0);
    store.commit('newTicket', { id: 1 });
    expect(store.state.tickets.length).toBe(1);
  });

  it('Get Statuses', () => {
    const state = {
      statuses: [
        {
          id: 'a7b91729-78e8-4f42-adec-e66b588c6764',
          name: 'To Do',
          alias: 'to-do',
        },
      ],
    };

    const result = getters.getStatuses(state);
    expect(result).toBe(state.statuses);
  });

  it('Route to about page', () => {
    expect(wrapper.html()).toContain('Create New Ticket');
    router.push('about');
    // TODO test routing
  });

  it('should match the snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot(); // TODO
  });
});
