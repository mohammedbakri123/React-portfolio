import Button from "./Button";
import ButtonAlt from "./ButtonAlt";

function ConfirmOverlay({
  onConfirm,
  onCancel,
  message = "Are you sure?",
  confirmButtonMessage = "Yes",
  cancelButtonMessage = "Cancel",
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-sm mx-4 text-center">
        <p className="text-lg font-semibold text-gray-900 mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <ButtonAlt onClick={onCancel}>{cancelButtonMessage}</ButtonAlt>
          <Button onClick={onConfirm}>{confirmButtonMessage}</Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOverlay;
