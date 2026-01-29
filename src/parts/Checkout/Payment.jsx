import React from "react";
import { Fade } from "react-awesome-reveal";
import { InputText, InputFile } from "elements/Form";
import { formatIDRCurrency } from "utils/currency";

import logoBca from "assets/images/logo-bca.jpg";
import logoMandiri from "assets/images/logo-mandiri.jpg";

export default function Payment(props) {
  const { data, ItemDetails, checkout } = props;

  const tax = 10;
  const subTotal = ItemDetails.price * checkout.duration;
  const grandTotal = (subTotal * tax) / 100 + subTotal;

  return (
    <Fade>
      <div className="container" style={{ marginBottom: 30 }}>
        <div className="row justify-content-center align-items-stretch">
          <div
            className="col-12 col-lg-5 border-right py-5"
            style={{ paddingRight: 80 }}
          >
            <div
              className="card shadow-lg rounded-4 p-4 border-0 bg-white h-100"
              style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
            >
              <h4 className="mb-4 fw-bold text-dark">Transfer Pembayaran</h4>
              <div className="payment-summary mb-4">
                <p className="mb-2 text-secondary">Tax: {tax}%</p>
                <p className="mb-2 text-secondary">
                  Subtotal: {formatIDRCurrency(subTotal)}
                </p>
                <p className="fs-4 fw-bolder text-primary">
                  Total: {formatIDRCurrency(grandTotal)}
                </p>
              </div>

              <div className="row g-3">
                <div className="col-12">
                  <div className="d-flex align-items-center p-3 rounded-4 border bg-white mb-2 shadow-sm">
                    <div className="me-3">
                      <img
                        src={logoBca}
                        alt="Bank Central Asia"
                        width="60"
                        className="rounded"
                      />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">Bank Central Asia</div>
                      <div className="text-muted small">2208 1996</div>
                      <div className="text-muted small">
                        PT. SATRIA CEMERLANG
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex align-items-center p-3 rounded-4 border bg-white shadow-sm">
                    <div className="me-3">
                      <img
                        src={logoMandiri}
                        alt="Bank Mandiri"
                        width="60"
                        className="rounded"
                      />
                    </div>
                    <div>
                      <div className="fw-bold text-dark">Bank Mandiri</div>
                      <div className="text-muted small">2208 1996</div>
                      <div className="text-muted small">
                        PT. SATRIA CEMERLANG
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5 py-5" style={{ paddingLeft: 80 }}>
            <div
              className="card shadow-lg rounded-4 p-4 border-0 bg-white h-100"
              style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
            >
              <h4 className="mb-4 fw-bold text-dark">Konfirmasi Pembayaran</h4>

              <div className="mb-4">
                <label
                  htmlFor="proofPayment"
                  className="form-label fw-medium text-secondary"
                >
                  Upload Bukti Transfer
                </label>
                <div className="input-group-custom">
                  <InputFile
                    accept="image/*"
                    id="proofPayment"
                    name="proofPayment"
                    value={data.proofPayment}
                    onChange={props.onChange}
                    inputClassName="form-control form-control-lg bg-light border-0 shadow-sm rounded-3 py-3 px-4"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="bankName"
                  className="form-label fw-medium text-secondary"
                >
                  Asal Bank
                </label>
                <div className="input-group-custom">
                  <InputText
                    id="bankName"
                    name="bankName"
                    type="text"
                    value={data.bankName}
                    onChange={props.onChange}
                    inputClassName="form-control form-control-lg bg-light border-0 shadow-sm rounded-3 py-3 px-4"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="bankHolder"
                  className="form-label fw-medium text-secondary"
                >
                  Nama Pengirim
                </label>
                <div className="input-group-custom">
                  <InputText
                    id="bankHolder"
                    name="bankHolder"
                    type="text"
                    value={data.bankHolder}
                    onChange={props.onChange}
                    inputClassName="form-control form-control-lg bg-light border-0 shadow-sm rounded-3 py-3 px-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
