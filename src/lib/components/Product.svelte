<script>
  import Header from './Header.svelte';
  import BackBtn from './BackBtn.svelte';
  import product1 from '../images/product1.jpg';
  import Counter from './Counter.svelte';
  import BlueBtn from './BlueBtn.svelte';
</script>

<Header title="Xem sản phẩm" />

<div class="bg-white flex flex-col gap-4 px-12 py-8">
  <div>
    <BackBtn />
  </div>
  
  <div class=" flex gap-4">
    <img src={product1} alt="UchiMusume6" class=" h-[50vh] select-none pointer-events-none" />
    
    <div class="flex flex-col gap-4">
      <div>
        <span class="font-bold after:content-[':']">Tên sản phẩm</span> Uchi no Ko 6
      </div>
      <div>
        <span class="font-bold after:content-[':']">Giá</span> 100.000đ
      </div>
      <div>
        <span class="font-bold after:content-[':']">Shop</span> FHS Shop
      </div>
      <div>
        <span class="font-bold after:content-[':']">Mô tả</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis accusantium consectetur odio blanditiis eos sequi quisquam suscipit maiores quas et iste molestiae labore ipsum sed corporis, expedita dolore laboriosam cumque!
      </div>
      <div>
        <span class="font-bold after:content-[':']">Số lượng</span> 
        <Counter />
      </div>
      <div class="self-end">
        <BlueBtn href="" title="Mua hàng" txtClass="uppercase"/>
      </div>
    </div>
  </div>
</div>