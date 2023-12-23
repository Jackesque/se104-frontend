<script>
  let count = 1;
  
  const increment = () => {
    ++count;
  }
  const decrement = () => {
    if (count > 1)
    --count;
  }
</script>

<div class=" inline-flex gap-2 justify-center items-center border border-black rounded-full">
  <button class=" text-xl px-2" on:click={decrement}>-</button>
  <div class=" select-none">{count}</div>
  <button class=" text-xl px-2" on:click={increment}>+</button>
</div>