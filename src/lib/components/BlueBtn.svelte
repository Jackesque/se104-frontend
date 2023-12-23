<script>
  import Button from "./Button.svelte";
  export let href, title, txtClass="";
</script>
<Button href={href} title={title} btnClass="block w-48 py-1 my-auto rounded text-white text-center text-lg bg-bluebtn cursor-pointer ease-in-out duration-300 hover:bg-bluebtnhover" txtClass={txtClass} />