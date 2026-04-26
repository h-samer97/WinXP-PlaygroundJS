class ProductManager {
    constructor() {
        this.priceInput = document.querySelector("#price");
        this.taxesInput = document.querySelector("#taxes");
        this.adsInput = document.querySelector("#ads");
        this.discountInput = document.querySelector("#discount");
        this.totalInput = document.querySelector("#total");
        this.submitButton = document.querySelector("#submit");

        this.allData = [];
        this.loadDataFromLocalStorage();
        this.attachEventListeners();
    }

    getCount() {
        const price = +this.priceInput.value;
        const taxes = +this.taxesInput.value;
        const ads = +this.adsInput.value;
        const discount = +this.discountInput.value;

        if (this.priceInput.value !== "") {
            const result = (price + taxes + ads) - discount;
            this.totalInput.value = result;
        }
    }

    loadDataFromLocalStorage() {
        if (localStorage.product != null) {
            try {
                const parsedData = JSON.parse(localStorage.product);
                if (Array.isArray(parsedData)) {
                    this.allData = parsedData;
                } else {
                    this.allData = [];
                    console.warn("localStorage.product contained non-array data. Initializing AllData as empty array.");
                }
            } catch (e) {
                console.error("Error parsing localStorage.product:", e);
                this.allData = [];
            }
        }
    }

    saveDataToLocalStorage() {
        localStorage.setItem("product", JSON.stringify(this.allData));
    }

    clearInputs() {
        this.priceInput.value = "";
        this.taxesInput.value = "";
        this.adsInput.value = "";
        this.discountInput.value = "";
        this.totalInput.value = "";
    }

    handleSubmit() {
        const productData = {
            price: this.priceInput.value,
            taxes: this.taxesInput.value,
            ads: this.adsInput.value,
            discount: this.discountInput.value,
            total: this.totalInput.value
        };

        this.allData.push(productData);
        this.saveDataToLocalStorage();
        this.getCount(); // Re-calculate total if needed (though it's already set on input)
        this.clearInputs();
    }

    attachEventListeners() {
        this.submitButton.onclick = () => this.handleSubmit();
        // You might want to attach getCount to input changes as well
        // this.priceInput.oninput = () => this.getCount();
        // this.taxesInput.oninput = () => this.getCount();
        // this.adsInput.oninput = () => this.getCount();
        // this.discountInput.oninput = () => this.getCount();
    }
}

// Instantiate the ProductManager to run the application
document.addEventListener('DOMContentLoaded', () => {
    new ProductManager();
});