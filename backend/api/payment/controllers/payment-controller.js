import PaymentRepository from "../repositories/payment-repository.js";

const paymentRepository = new PaymentRepository();

class PaymenyController {

    constructor() {
        this.paymentRepository = paymentRepository;
    }

}

export default PaymenyController;