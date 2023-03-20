const d = document;

export default function contactForm() {
  const $form = d.querySelector(".contact-form"),
    $inputs = d.querySelectorAll(".contact-form [required]");

  $inputs.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
  });

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".contact-form [required]")) {
      let $inputs = e.target,
        pattern = $inputs.pattern || $inputs.dataset.pattern;

      if (pattern && $inputs.value !== "") {
        //console.log("El input tiene patrón");

        let regex = new RegExp(pattern);
        return !regex.exec($inputs.value)
          ? d.getElementById($inputs.name).classList.add("is-active")
          : d.getElementById($inputs.name).classList.remove("is-active");
      }
      if (!pattern) {
        //console.log("El input NO tiene patrón");
        return $inputs.value === ""
          ? d.getElementById($inputs.name).classList.add("is-active")
          : d.getElementById($inputs.name).classList.remove("is-active");
      }
    }
  });

  d.addEventListener("submit", (e) => {
    e.preventDefault();

    const $loader = d.querySelector(".contact-form-loader"),
      $response = d.querySelector(".contact-form-response");

    $loader.classList.remove("none");

    fetch("https://formsubmit.co/ajax/tegnoblog.17alfrdo@gmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        $loader.classList.add("none");
        $response.classList.remove("none");
        $response.innerHTML = `<p>${json.message} </p>`;
        $form.reset();
      })
      .catch((err) => {
        let message = err.statusText || "Ocurrio un error al enviar";
        $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
      })
      .finally(() =>
        setTimeout(() => {
          setTimeout(() => {
            $response.classList.add("none");
          }, 3000);
        }, 3000)
      );

    /*  setTimeout(() => {

      setTimeout(() => {
        $response.classList.add("none");
      }, 3000);
    }, 3000); */
  });
}
