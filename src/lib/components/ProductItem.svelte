<script>
  import product1 from '../images/product1.jpg';
  import BlueBtn from './BlueBtn.svelte'
</script>

<tr>
  <td class="py-4 border border-black">
    <div class=" flex justify-center items-center">
      <img src={product1} alt="UchiMusume6" class=" max-h-48 select-none pointer-events-none" />
    </div>
  </td>
  <td class="border border-black">
    <div class=" flex justify-center items-center">
      <BlueBtn href="./products/1" title="Xem ngay"/>
    </div>
  </td>
</tr>