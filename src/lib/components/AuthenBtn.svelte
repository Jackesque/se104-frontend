<script>
  import Button from "./Button.svelte";
</script>
<Button href={$$props.href} title={$$props.title} class="block min-w-[9rem] py-2 my-auto rounded text-tprim text-center text-lg bg-bgprim cursor-pointer ease-in-out duration-300 hover:bg-authenbtnhover" />