import { Suspense } from "react";
import Appointment from "./Appointment";
import ChangePasswordForm from "./ChangePasswordForm";
import ConfirmAppointment from "./ConfirmAppointment";
import ForgotPasswordForm from "./ForgotPasswordForm";
import Modal from "./Modal";
import SignInForm from "./SignInForm";
import SignupForm from "./SignupForm";
import VerifyForm from "./VerifyForm";

export default function Modals() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal modalId="modal" openId="sign-in">
        <SignInForm />
      </Modal>

      <Modal modalId="modal" openId="sign-up">
        <SignupForm />
      </Modal>

      <Modal modalId="modal" openId="forgot-password">
        <ForgotPasswordForm />
      </Modal>

      <Modal modalId="modal" openId="verify-email">
        <VerifyForm />
      </Modal>

      <Modal modalId="modal" openId="change-password">
        <ChangePasswordForm />
      </Modal>

      <Modal modalId="modal" openId="appointment">
        <Appointment />
      </Modal>
      <Modal modalId="booked" openId="appointment" className="!max-w-xs">
        <ConfirmAppointment />
      </Modal>
    </Suspense>
  );
}
