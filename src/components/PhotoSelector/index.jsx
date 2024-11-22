import { FaUser } from "react-icons/fa";
import Button from "../Button";
import { useRef } from "react";
import { toast } from "react-toastify";

const PhotoSelector = ({ photo, onSelect, loading }) => {
  const fileInputRef = useRef(null);

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (
      file &&
      (file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png")
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSelect(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Por favor, selecione uma imagem no formato JPG ou PNG.");
    }
  };

  return (
    <div className="flex flex-col mt-4 gap-2 items-center">
      {photo ? (
        <img
          src={photo}
          alt="Imagem selecionada"
          className="mt-2 w-32 h-32 object-cover rounded-full"
        />
      ) : (
        <div className="flex items-center justify-center mt-2 w-32 h-32 bg-gray-200 rounded-full">
          <FaUser className="w-16 h-16 text-gray-500" />
        </div>
      )}
      <Button onClick={openFileSelector} disabled={loading} size="fit">
        Selecionar Foto
      </Button>
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
};

export default PhotoSelector;
