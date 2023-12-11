import { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import type { ChangeEvent, SetStateAction } from "react";

import styles from "./UploadAvatar.module.css";
import Modal from "../UI/Modal/Modal";
import Slider from "../UI/Slider/Slider";
import Button from "../UI/Button/Button";

type Props = {
  onSave: (avatar: Blob) => Promise<void>;
};

const UploadAvatar = ({ onSave }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [slideValue, setSlideValue] = useState(10);
  const [src, setSrc] = useState<string>("");
  const cropRef = useRef<AvatarEditor | null>(null);
  const inputRef = useRef(null);

  const onCloseHandler = () => {
    setIsOpen(false);
  };

  const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      setSrc(URL.createObjectURL(target.files[0]));
      setIsOpen(true);
    }
  };

  const onSaveHandler = async () => {
    if (cropRef.current) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      await onSave(blob);
      setIsOpen(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImgChange}
      />

      <Modal isOpen={isOpen} height={500} width={800}>
        <div className={styles.uploadAvatarWrapper}>
          <AvatarEditor
            ref={cropRef}
            image={src}
            width={250}
            height={250}
            border={50}
            borderRadius={150}
            color={[0, 0, 0, 0.72]}
            scale={slideValue / 10}
            rotate={0}
          />
          <Slider
            min={10}
            max={50}
            width={400}
            defaultValue={slideValue}
            value={slideValue}
            onChange={(event: ChangeEvent) =>
              setSlideValue(Number((event.target as HTMLInputElement).value))
            }
          />
          <Button title={"Cancel"} onClick={onCloseHandler} />
          <Button title={"Save"} onClick={onSaveHandler} />
        </div>
      </Modal>
    </>
  );
};

export default UploadAvatar;
