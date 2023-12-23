<script>
  import Button from "./Button.svelte";
  export let href, title;
</script>
<Button href={href} title={title} btnClass="block w-36 py-1 my-auto rounded text-tprim text-center text-lg bg-bgprim cursor-pointer ease-in-out duration-300 hover:bg-authenbtnhover" />