import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
	const { id, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(id);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		getValues,
	} = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	const { createCabin, isCreating } = useCreateCabin();
	const { editCabin, isEditing } = useEditCabin();

	const isWorking = isEditing || isCreating;
	const onSubmit = (data) => {
		const img = typeof data.image === "string" ? data.image : data?.image[0];
		if (isEditSession) {
			editCabin({ newCabin: { ...data, image: img }, id });
		} else {
			createCabin({ ...data, image: img });
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label={"Cabin name"} error={errors?.name?.message}>
				<Input
					disabled={isWorking}
					type="text"
					id="name"
					{...register("name", { required: "Name is required" })}
				/>
			</FormRow>

			<FormRow
				label={"Maximum capacity"}
				error={errors?.maxCapacity?.message}
			>
				<Input
					disabled={isWorking}
					type="number"
					id="maxCapacity"
					{...register("maxCapacity", {
						required: "Maximum capacity is required",
						min: {
							value: 1,
							message: "Capacity cant be less than 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
				<Input
					disabled={isWorking}
					type="number"
					id="regularPrice"
					min={0}
					{...register("regularPrice", {
						required: "Regular price is required",
					})}
				/>
			</FormRow>

			<FormRow label={"Discount"} error={errors?.discount?.message}>
				<Input
					disabled={isWorking}
					type="number"
					id="discount"
					defaultValue={0}
					min={0}
					{...register("discount", {
						min: {
							value: 0,
							message: "Discount cant be less than 0",
						},
						validate: (discountValue) => {
							if (discountValue > getValues()?.regularPrice) {
								return "Discount cant be more than regular price";
							}
						},
					})}
				/>
			</FormRow>

			<FormRow
				label={"Description for website"}
				error={errors?.description?.message}
			>
				<Textarea
					disabled={isWorking}
					type="number"
					id="description"
					defaultValue=""
					{...register("description", {
						required: "Description is required",
					})}
				/>
			</FormRow>

			<FormRow label={"Cabin image"} error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					disabled={isWorking}
					{...register("image", {
						required: isEditSession ? false : "Image is required",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isWorking} type="submit">
					{isEditSession ? "Update " : "Create "}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
