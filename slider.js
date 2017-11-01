(function() {
  function onSliderSelectionChange(sliderInput) {
    var valueLabel = document.querySelector(".slider-value-label");
    valueLabel.innerHTML = sliderValueFormat(sliderInput.value);

    var min = sliderInput.min,
      max = sliderInput.max;

    var labelWidth = eval(valueLabel.clientWidth / sliderInput.clientWidth);
    var left = eval((sliderInput.value - min) / (max - min) - labelWidth / 2.0);

    if (left < 0) {
      left = 0;
    } else if ((left + labelWidth) > 1) {
      left = 1 - labelWidth;
    }

    valueLabel.style.marginLeft = eval(100.0 * left) + "%";

    // call custom callback
    var callback = sliderInput.getAttribute("data-change");
    if (window[callback]) {
      window[callback](sliderInput.value);
    }
  }

  function onSliderLoad() {
    var sliderContainers = document.querySelectorAll(".slider-container");
    sliderContainers.forEach(function(sliderContainer) {
      var sliderInput = sliderContainer.querySelector("input[type='range']");

      var minLabel = document.createElement("label");
      minLabel.setAttribute("class", 'slider-min-label');
      minLabel.innerHTML = sliderValueFormat(sliderInput.min);
      sliderContainer.appendChild(minLabel);

      var maxLabel = document.createElement("label");
      maxLabel.setAttribute("class", 'slider-max-label');
      maxLabel.innerHTML = sliderValueFormat(sliderInput.max);
      sliderContainer.appendChild(maxLabel);

      var valueLabel = document.createElement("label");
      valueLabel.setAttribute("class", 'slider-value-label');
      valueLabel.innerHTML = sliderValueFormat(sliderInput.value);
      sliderContainer.appendChild(valueLabel);

      sliderInput.addEventListener("change", function() {
        onSliderSelectionChange(this);
      });

      sliderInput.addEventListener("input", function() {
        onSliderSelectionChange(this);
      });

      onSliderSelectionChange(sliderInput);
    });
  }

  function sliderValueFormat(value) {
    return (Number(value)).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    }).slice(0, -3);
  }

  window.addEventListener("load", onSliderLoad);
})();
