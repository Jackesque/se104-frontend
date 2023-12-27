<script>
  import Button from "./Button.svelte";
</script>
<Button href={$$props.href} title={$$props.title} id={$$props.id} class={["block min-w-[12rem] py-2 my-auto rounded text-white text-center text-lg bg-bluebtn cursor-pointer ease-in-out duration-300 hover:bg-bluebtnhover", $$props.class].join(' ')} on:click />