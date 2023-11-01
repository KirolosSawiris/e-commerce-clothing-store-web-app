package com.shop.webshop.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Rates")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String rate_id;
    @Transient
    private Amount shipping_amount;
    private double amount;
    private int delivery_days;
    private Date estimated_delivery_date;
    private String carrier_delivery_days;
    private Date ship_date;
    private String service_type;
    private String shipping_address;
    private String shipping_country;
    private String shipping_region;
    private String shipping_postcode;

    @OneToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getRate_id() {
        return rate_id;
    }

    public void setRate_id(String rate_id) {
        this.rate_id = rate_id;
    }

    public Amount getShipping_amount() {
        return shipping_amount;
    }

    public void setShipping_amount(Amount shipping_amount) {
        this.shipping_amount = shipping_amount;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getDelivery_days() {
        return delivery_days;
    }

    public void setDelivery_days(int delivery_days) {
        this.delivery_days = delivery_days;
    }

    public Date getEstimated_delivery_date() {
        return estimated_delivery_date;
    }

    public void setEstimated_delivery_date(Date estimated_delivery_date) {
        this.estimated_delivery_date = estimated_delivery_date;
    }

    public String getCarrier_delivery_days() {
        return carrier_delivery_days;
    }

    public void setCarrier_delivery_days(String carrier_delivery_days) {
        this.carrier_delivery_days = carrier_delivery_days;
    }

    public Date getShip_date() {
        return ship_date;
    }

    public void setShip_date(Date ship_date) {
        this.ship_date = ship_date;
    }

    public String getService_type() {
        return service_type;
    }

    public void setService_type(String service_type) {
        this.service_type = service_type;
    }

    public static class Amount {
        private String currency;
        private double amount;

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }

        public double getAmount() {
            return amount;
        }

        public void setAmount(double amount) {
            this.amount = amount;
        }

    }

    public String getShipping_address() {
        return shipping_address;
    }

    public void setShipping_address(String shipping_address) {
        this.shipping_address = shipping_address;
    }

    public String getShipping_country() {
        return shipping_country;
    }

    public void setShipping_country(String shipping_country) {
        this.shipping_country = shipping_country;
    }

    public String getShipping_region() {
        return shipping_region;
    }

    public void setShipping_region(String shipping_region) {
        this.shipping_region = shipping_region;
    }

    public String getShipping_postcode() {
        return shipping_postcode;
    }

    public void setShipping_postcode(String shipping_postcode) {
        this.shipping_postcode = shipping_postcode;
    }
}
