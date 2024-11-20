import { ChangeEvent, useEffect, useState } from 'react';
import Card from '../../ui/atoms/Card';
import FocusableInput from '../../ui/atoms/FocusableInput';
import s from './AddressCard.module.scss';
import {
  FocusContext,
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import FocusableButton from '../../ui/atoms/FocusableButton';
import { SAVED_ADDRESS } from '../../constants/addresses';
import Address from '../../types/Address';
import FocusableDiv from '../../ui/atoms/FocusableDiv';
import toast from 'react-hot-toast';

const NAME = 'Name';
const PHONE_NUMBER = 'Phone number';
const ADDRESS = 'Address';
const LOCALITY = 'Locality';
const SAVE_ADDRESS_CTA = 'saveAddress';
const GO_BACK_CTA = 'goBack';
const EDIT_ADDRESS_CTA = 'editAddress';

const inputStyle = { width: '20rem' };

type Props = {
  onAddressSelect: (address: Address) => void;
};

const AddressCard = ({ onAddressSelect }: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESS[0]);
  const [savedAddresses, setSavedAddresses] = useState(SAVED_ADDRESS);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');

  const { ref, focusKey } = useFocusable();

  const setStepFocus = () => {
    let focusKey = selectedAddress.id.toString();
    if (activeStep === 1) focusKey = NAME;
    else if (activeStep === 2) focusKey = EDIT_ADDRESS_CTA;
    setFocus(focusKey);
  };

  const handleSelectAddress = (item: Address) => {
    setSelectedAddress(item);
    setActiveStep(2);
    onAddressSelect(item);
    toast.success('Address selected');
  };

  const resetFormValues = () => {
    setName('');
    setPhone('');
    setAddress('');
    setLocality('');
  };

  const saveAddress = () => {
    const newAddress = {
      name,
      phone,
      address,
      locality,
      id: savedAddresses.length,
    };

    SAVED_ADDRESS.push(newAddress);
    setSavedAddresses([...SAVED_ADDRESS]);
    handleSelectAddress(newAddress);
    resetFormValues();
  };

  const getFormattedAddress = (addressObj = selectedAddress) => {
    const { name, phone, address, locality } = addressObj;
    return `${name}, ${phone}, ${address}, ${locality}`;
  };

  const renderSavedAddressess = () => {
    return (
      <Card>
        <div className={s.savedAddresses}>
          <div className={s.heading}>
            <h2 className={s.title}>Select Address</h2>

            <FocusableButton
              focusKey=''
              onClick={() => setActiveStep(1)}
              label='Add New Address'
            />
          </div>
          {savedAddresses.map((item) => (
            <div key={item.id} className={s.addressField}>
              <FocusableDiv
                onEnterPressCallback={() => handleSelectAddress(item)}
                focusKey={item.id.toString()}
              >
                <Card>
                  <div className={s.formattedAddress}>
                    {getFormattedAddress(item)}
                  </div>
                </Card>
              </FocusableDiv>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const renderAddressForm = () => {
    return (
      <div className={s.form}>
        <h2 className={s.title}>Add address</h2>

        <div className={s.section}>
          <FocusableInput
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder={NAME}
            focusKey={NAME}
            customStyle={inputStyle}
          />
          <FocusableInput
            value={phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPhone(e.target.value)
            }
            placeholder={PHONE_NUMBER}
            focusKey={PHONE_NUMBER}
            customStyle={inputStyle}
          />
        </div>

        <div className={s.section}>
          <FocusableInput
            value={address}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
            placeholder={ADDRESS}
            focusKey={ADDRESS}
            customStyle={inputStyle}
          />

          <FocusableInput
            value={locality}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLocality(e.target.value)
            }
            placeholder={LOCALITY}
            focusKey={LOCALITY}
            customStyle={inputStyle}
          />
        </div>

        <div className={s.section}>
          <FocusableButton
            label='Save and continue'
            focusKey={SAVE_ADDRESS_CTA}
            onClick={saveAddress}
            disabled={!name || !phone || !address || !locality}
          />
          <FocusableButton
            label='Go Back'
            focusKey={GO_BACK_CTA}
            onClick={() => setActiveStep(0)}
          />
        </div>
      </div>
    );
  };

  const renderDeliveryAddress = () => {
    return (
      <div className={s.deliveryAddress}>
        <div className={s.info}>
          <h2 className={s.title}>Delivering to:</h2>
          <div className={s.section}>{getFormattedAddress()}</div>
        </div>
        <FocusableButton
          focusKey={EDIT_ADDRESS_CTA}
          onClick={() => setActiveStep(0)}
          label='Edit'
        />
      </div>
    );
  };

  useEffect(() => {
    setStepFocus();
  }, [activeStep]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.root} ref={ref}>
        <Card>
          <>
            {activeStep === 0 && renderSavedAddressess()}

            {activeStep === 1 && renderAddressForm()}

            {activeStep === 2 && renderDeliveryAddress()}
          </>
        </Card>
      </div>
    </FocusContext.Provider>
  );
};

export default AddressCard;
