<svelte:head>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</svelte:head>

<script>
  import { onMount } from "svelte";
  import axios from "$lib/utils/axios.customize.js";
  import BackBtn from "$lib/components/BackBtn.svelte";
  
  let shopId, incomeMonth, incomeYear, selectedMonth, selectedYear, income, myChart;
  
  const handleFilter = async (condition) => {
    let filteredIncome = [], labels;
    if (condition === "month") {
      const incomeRes = await axios.get(`/api/v1/order/dashboard/${shopId}?year=${selectedMonth.split('/')[1]}&month=${selectedMonth.split('/')[0]}`);
      filteredIncome = [incomeRes.data];
      labels = [selectedMonth];
    }
    if (condition === "year") {
      const incomeEveryMonth = incomeMonth.filter(item => Number(item.split('/')[1]) === selectedYear);
      for (let i = 0; i < incomeEveryMonth.length; ++i) {
        const incomeRes = await axios.get(`/api/v1/order/dashboard/${shopId}?year=${incomeEveryMonth[i].split('/')[1]}&month=${incomeEveryMonth[i].split('/')[0]}`);
        const incomeWithMonth = {...incomeRes.data, month: Number(incomeEveryMonth[i].split('/')[0])};
        filteredIncome = [...filteredIncome, incomeWithMonth];
      }
      const addZero = (num) => {
        if (Number(num) < 10) {
          return '0'.concat(num.toString());
        }
        return num.toString();
      }
      labels = filteredIncome.map(item => addZero(item.month).concat(`/${selectedYear}`));
    }
    income = filteredIncome;
    console.log(income);

    // my_chart_container.removeChild(my_chart);
    // const myChartElement = document.createElement('canvas');
    // myChartElement.id = 'my_chart';
    // my_chart_container.appendChild(myChartElement);
    myChart.data.labels = labels;
    myChart.data.datasets.data = income;
    myChart.update();
    // new Chart(my_chart, {
    //   type: 'bar',
    //   data: {
    //     labels: [selectedMonth],
    //     datasets: [{
    //       label: 'Doanh thu',
    //       data: income,
    //       borderWidth: 1,
    //       barPercentage: 1/12,
    //     }]
    //   }
    // });
    
    console.log("income", income);
  }
  
  onMount(async () => {
    shopId = JSON.parse(localStorage.getItem("shopId"));
    
    const checkoutRes = await axios.get(`/api/v1/order/shop/${shopId}`);
    incomeMonth = [... new Set(checkoutRes.data.filter(item => item.status === "COMPLETE").map(item => item.updatedAt.slice(0, 7).split('-').reverse().join('/')))];
    // incomeMonth = ['1/2024', '2/2024', '1/2025']
    incomeYear = [... new Set(incomeMonth.map(item => Number(item.split('/')[1])))];
    
    const incomeRes = await axios.get(`/api/v1/order/dashboard/${shopId}?year=2024&month=1`);
    income = [incomeRes.data].map(item => item.totalMoney);

    const myChartElement = document.createElement('canvas');
    myChartElement.id = 'my_chart';
    my_chart_container.appendChild(myChartElement);
    myChart = new Chart(my_chart, {
      type: 'bar',
      data: {
        labels: [selectedMonth],
        datasets: [{
          label: 'Doanh thu',
          data: income,
          borderWidth: 1,
          barPercentage: 1/12,
        }]
      }
    });
  });
  
</script>
<div class="bg-white flex flex-col gap-4 px-12 py-8">
  <div>
    <BackBtn />
  </div>
  
  <div>
    <div>
      Lọc theo tháng: 
      {#if incomeMonth}
      <select name="month" id="month" bind:value={selectedMonth}>
        {#each incomeMonth as month}
        <option value={month}>{month}</option>
        {/each}
      </select>
      {/if}
      <button class="px-4 py-1 bg-slate-200 rounded" on:click={() => handleFilter("month")}>Lọc</button>
    </div>
    Lọc theo năm: 
    {#if incomeYear}
    <select name="year" id="year" bind:value={selectedYear}>
      {#each incomeYear as year}
      <option value={year}>{year}</option>
      {/each}
    </select>
    {/if}
    <button class="px-4 py-1 bg-slate-200 rounded" on:click={() => handleFilter("year")}>Lọc</button>
  </div>
  <div id="my_chart_container">
  </div>
</div>