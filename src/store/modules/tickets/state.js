export default () => ({
  statuses: [
    {
      id: 'a7b91729-78e8-4f42-adec-e66b588c6764',
      name: 'To Do',
      alias: 'to-do',
    },
    {
      id: '9ad111c9-2c4b-42d0-bf88-4b9ac9529634',
      name: 'In Progress',
      alias: 'in-progress',
    },
    {
      id: '3f69648f-2871-4e62-981a-cb9213ea929d',
      name: 'Completed',
      alias: 'completed',
    },
  ],

  tickets: [
    {
      id: '5f697ee2-8329-4496-ab94-d5c175cdfcdf',
      title: 'Gather the Dragon Balls',
      status_id: '9ad111c9-2c4b-42d0-bf88-4b9ac9529634',
    },
    {
      id: '0182e7ce-ed94-4d69-8e4d-756baddff8d4',
      title: 'Summon Shenron',
      status_id: 'a7b91729-78e8-4f42-adec-e66b588c6764',
    },
    {
      id: 'b1ab4878-3fb3-4e74-bc87-35da10208a5d',
      title: 'Waste a wish bringing back Krillin',
      status_id: 'a7b91729-78e8-4f42-adec-e66b588c6764',
    },
    {
      id: 'b55a4d18-da0b-4e53-8ba6-68e33e90a77c',
      title: 'Defeat Frieza',
      status_id: '9ad111c9-2c4b-42d0-bf88-4b9ac9529634',
    },
    {
      id: 'd77a3d3d-888d-4449-9ee7-d6e865aca230',
      title: 'Make Piccolo raise my son',
      status_id: '3f69648f-2871-4e62-981a-cb9213ea929d',
    },
    {
      id: '1e008513-ecaa-47db-9614-780dacf832ae',
      title: 'Turn Super Saiyan',
      status_id: '3f69648f-2871-4e62-981a-cb9213ea929d',
    },
  ],
});
