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
      filteredIncome = [incomeRes.data.totalMoney];
      labels = [selectedMonth];
    }
    if (condition === "year") {
      const addZero = (num) => {
        if (Number(num) < 10) {
          return '0'.concat(num.toString());
        }
        return num.toString();
      }
      const incomeEveryMonth = incomeMonth.filter(item => Number(item.split('/')[1]) === selectedYear);
      for (let i = 0; i < incomeEveryMonth.length; ++i) {
        const incomeRes = await axios.get(`/api/v1/order/dashboard/${shopId}?year=${incomeEveryMonth[i].split('/')[1]}&month=${incomeEveryMonth[i].split('/')[0]}`);
        const incomeWithMonth = {totalMoney: incomeRes.data.totalMoney, month: Number(incomeEveryMonth[i].split('/')[0])};
        filteredIncome = [...filteredIncome, incomeWithMonth];
      }
      labels = filteredIncome.map(item => addZero(item.month).concat(`/${selectedYear}`));
    }
    income = filteredIncome;
    console.log(income);
    
    myChart.data.labels = labels;
    myChart.data.datasets.data = income;
    myChart.update();
    
    console.log("income", income);
  }
  
  onMount(async () => {
    shopId = JSON.parse(localStorage.getItem("shopId"));
    
    const checkoutRes = await axios.get(`/api/v1/order/shop/${shopId}`);
    incomeMonth = [... new Set(checkoutRes.data.filter(item => item.status === "COMPLETE").map(item => item.updatedAt.slice(0, 7).split('-').reverse().join('/')))];
    incomeYear = [... new Set(incomeMonth.map(item => Number(item.split('/')[1])))];
    
    const incomeRes = await axios.get(`/api/v1/order/dashboard/${shopId}?year=2024&month=1`);
    income = [incomeRes.data].map(item => item.totalMoney);
    
    // const myChartElement = document.createElement('canvas');
    myChartElement.id = 'my_chart';
    my_chart_container.appendChild(myChartElement);
    myChart = new Chart(my_chart, {
      type: 'bar',
      data: {
        labels: incomeMonth,
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
  
  <div class="flex flex-col gap-2">
    <div>
      Lọc theo tháng: 
      <select name="month" id="month" bind:value={selectedMonth}>
        {#if incomeMonth}
        {#each incomeMonth as month}
        <option value={month}>{month}</option>
        {/each}
        {/if}
      </select>
      <button class="px-4 py-1 bg-slate-200 rounded" on:click={() => handleFilter("month")}>Lọc</button>
    </div>
    <div>
      Lọc theo năm: 
      <select name="year" id="year" bind:value={selectedYear}>
        {#if incomeYear}
        {#each incomeYear as year}
        <option value={year}>{year}</option>
        {/each}
        {/if}
      </select>
      <button class="px-4 py-1 bg-slate-200 rounded" on:click={() => handleFilter("year")}>Lọc</button>
    </div>
  </div>
  <div id="my_chart_container">
  </div>
</div>