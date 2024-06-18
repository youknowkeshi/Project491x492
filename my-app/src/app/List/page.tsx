"use client";
import React from "react";
import Nav from "../component/Nav";
import { Button, Card } from "flowbite-react";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type Props = {};

export default function page({}: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  return (
    <div>
      <Nav />
      <h1 className="mt-7 text-xl tracking-tight text-gray-900 dark:text-white ml-1">
        Appointment List
      </h1>
      <Card className="border-r-4 border-l-4 border-x-cyan-300 mt-3 mb-4 p-4 relative  ">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Time : 9.00 - 10.00
        </h5>
        <hr></hr>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Name : Pongtanate Namsawat
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Student ID : 630612106
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Facebook : URL
        </p>
        <div className="flex flex-row gap-4 absolute bottom-4 right-4">
          <Button
            outline
            gradientDuoTone="cyanToBlue"
            onClick={() => setOpenModal2(true)}
          >
            Details
          </Button>
          <Modal
            dismissible
            show={openModal2}
            onClose={() => setOpenModal2(false)}
          >
            <Modal.Header>Talk details</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  With less than a month to go before the European Union enacts
                  new consumer privacy laws for its citizens, companies around
                  the world are updating their terms of service agreements to
                  comply.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  The European Union’s General Data Protection Regulation
                  (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                  common set of data rights in the European Union. It requires
                  organizations to notify users as soon as possible of high-risk
                  data breaches that could personally affect them.
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                gradientMonochrome="failure"
                onClick={() => setOpenModal2(false)}
              >
                close
              </Button>
            </Modal.Footer>
          </Modal>
          <Button
            gradientMonochrome="failure"
            onClick={() => setOpenModal(true)}
          >
            Cancle
          </Button>
        </div>
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => setOpenModal(false)}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, canceld
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Card>
    </div>
  );
}
