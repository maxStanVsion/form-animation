const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");

const tl = gsap.timeline({ defaults: { duration: 1 } });

// Line
const start =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

// Elastic Effect
containers.forEach((container) => {
  const input = container.querySelector(".input");
  const line = container.querySelector(".elastic-line");
  const placeholder = container.querySelector(".placeholder");

  input.addEventListener("focus", function (e) {
    if (!e.target.value) {
      tl.fromTo(
        line,
        { attr: { d: start } },
        { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
      )
        .to(line, { attr: { d: start }, ease: "elastic.out(3,0.5)" }, "<50%")
        .to(
          placeholder,
          {
            top: "-75%",
            left: 0,
            scale: 1,
            duration: 0.5,
            fontSize: "0.5rem",
            ease: "Power2.easeOut",
          },
          "<10%"
        );
    }

    if(!e.target.value.length){
      line.style.stroke = "#e96363";
      return;
    }
    
    if(e.target.value.length <= 3) {
      line.style.stroke = "#e9ab63";
      return;
    }
    
    line.style.stroke = "#6190e8";
  });

  input.addEventListener("blur", function (e) {
    if (!e.target.value) {
      gsap.to(
          placeholder,{top: 0, left: 0, scale: 1, duration: 1, fontSize: "0.6rem",ease: "bounce.out",}
        );
    }

    if(!e.target.value.length){
      line.style.stroke = "#d1d4da";
      return;
    }
  });

  input.addEventListener("input", function(e) {
    if(!e.target.value.length){
      line.style.stroke = "#e96363";
      return;
    }
    
    if(e.target.value.length <= 3) {
      line.style.stroke = "#e9ab63";
      return;
    }
    
    line.style.stroke = "#6190e8";
  })
});
