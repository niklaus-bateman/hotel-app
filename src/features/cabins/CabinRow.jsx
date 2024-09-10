import React, { useState } from "react";
import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
	const { deleteCabin, isDeleting } = useDeleteCabin();
	const { createCabin, isCreating } = useCreateCabin();
	const [showEditForm, setShowEditForm] = useState(false);
	const {
		id: cabinId,
		name,
		maxCapacity,
		regularPrice,
		discount,
		image,
		description,
	} = cabin;

	const handleCopy = () => {
		// we cant spread cabin of linr 64 , then there will be two objects with same id, hence causing a conflict.
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			image,
			description,
		});
	};

	return (
		<>
			<TableRow>
				<Img src={image} />
				<Cabin>{name}</Cabin>
				<div>{maxCapacity} Persons</div>
				<Price>{formatCurrency(regularPrice)}</Price>
				<Discount>{`${
					discount ? `${discount}%` : "No discount"
				}`}</Discount>
				<div>
					<button onClick={handleCopy} disabled={isCreating}>
						<HiPencil />
					</button>
					<button onClick={() => setShowEditForm(!showEditForm)}>
						<HiSquare2Stack />
					</button>
					<button
						onClick={() => deleteCabin(cabinId)}
						disabled={isDeleting}
					>
						<HiTrash />
					</button>
				</div>
			</TableRow>
			{showEditForm && <CreateCabinForm cabinToEdit={cabin} />}
		</>
	);
};

export default CabinRow;
