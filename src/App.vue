

<template>
  <div ref="parent" class="parent" @mousemove="onMouseMove" @mouseup="stopDragging">
    <div
      ref="child" class="child" :style="{ left: `${childPosition.x}px`, top: `${childPosition.y}px` }"
      @mousedown="startDragging" > Drag Me </div>
  </div>
  <div>
    Position from parent's bottom-left: x: {{ positionFromLeftBottom.x }}, y: {{ positionFromLeftBottom.y }}
  </div>
 
</template>


<script setup>
import {ref, computed, onMounted} from 'vue'
const parent = ref(null);
const child = ref(null);
const childPosition = ref({ x: 0, y: 400 });
const isDragging = ref(false);
const offset = ref({ x: 0, y: 0 });
let positionFromLeftBottom= ref({x:0,y:0});
const startDragging =(event)=>{

  isDragging.value = true;
  offset.value = {
    x: event.clientX - childPosition.value.x,
    y: event.clientY - childPosition.value.y
  };
  console.log('offset.value',offset.value);
  
}

const stopDragging =(event)=>{
  isDragging.value = false;
  positionFromLeftBottom.value=calculateDistance(parent.value.getBoundingClientRect(),
  child.value.getBoundingClientRect());
  console.log('positionFromLeftBottom',positionFromLeftBottom.value);

}


const onMouseMove = (event) => {
  if (!isDragging.value) return;
  

  // Calculate the new position
  const newX = event.clientX - offset.value.x;
  const newY = event.clientY - offset.value.y;

  // Get parent dimensions
  const parentRect = parent.value.getBoundingClientRect();
  const childRect = child.value.getBoundingClientRect();

  // Constrain the child within the parent boundaries
  childPosition.value = {
    x: Math.max(0, Math.min(newX, parentRect.width - childRect.width)),
    y: Math.max(0, Math.min(newY, parentRect.height - childRect.height)),
  };
};


function calculateDistance(parentRect,childRect){ 
  console.log('parentRect',parentRect);
  
  return {
    x: childRect.left - parentRect.left,
    y: parentRect.bottom - childRect.bottom,
  };
}
// Event listeners
onMounted(() => {
  window.addEventListener('mouseup', stopDragging);
});
</script>


<style scoped>
.parent {
  position: relative;
  width: 500px;
  height: 500px;
  background-color: #f0f0f0;
  overflow: hidden; /* Ensure that the child cannot be dragged out of bounds */
}

.child {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: lightblue;
  cursor: grab;
}

</style>
