import React, { Fragment, useState, useEffect } from "react";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constant/userConstants";
import MetaData from "../Layout/MetaData";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Container, Avatar, VStack, Heading, Input, Button } from "@chakra-ui/react";

const UpdatePassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated === false)  navigate('/login');
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated, isAuthenticated, navigate]);

  return (
    <Fragment>
      <MetaData title={"Update Password"}  />
      {loading ? (
        <Loader />
      ) : (
        <Container maxW={"container.xl"} h={"100vh"} p={"16"}>
          <form>
            <VStack
              alignItems={"stretch"}
              spacing={"8"}
              w={["full", "96"]}
              m={"auto"}
            >
              <Heading alignSelf={"center"}>Update Profile</Heading>
              <Avatar alignSelf={"center"} boxSize={"32"} />

              <VStack>
                <Input
                  placeholder={"Old Password"}
                  type={"password"}
                  required
                  focusBorderColor={"purple.500"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Input
                  placeholder={"New Password"}
                  type={"password"}
                  required
                  value={newPassword}
                  focusBorderColor={"purple.500"}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                  placeholder={"Password"}
                  type={"password"}
                  required
                  value={confirmPassword}
                  focusBorderColor={"purple.500"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button
                  colorScheme={"purple"}
                  type={"submit"}
                  onClick={updatePasswordSubmit}
                >
                  Update
                </Button>
              </VStack>
            </VStack>
          </form>
        </Container>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
