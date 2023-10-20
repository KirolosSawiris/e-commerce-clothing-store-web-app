//package com.shop.webshop;
//
//
//import com.shop.webshop.models.Category;
//import com.shop.webshop.repositories.CategoryRepository;
//import com.shop.webshop.repositories.UserRepository;
//import org.checkerframework.checker.units.qual.C;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import static org.hamcrest.CoreMatchers.is;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(
//        webEnvironment = SpringBootTest.WebEnvironment.MOCK,
//        classes = WebshopApplication.class)
//@AutoConfigureMockMvc
//@TestPropertySource(
//        locations = "classpath:application-integrationtest.properties")
//public class UserRestControllerIntegrationTest {
//
//    @Autowired
//    private MockMvc mvc;
//
//    @Autowired
//    private CategoryRepository repository;
//
//    @Test
//    public void testCategoryRestApi() throws Exception{
//
//        Category category = new Category();
//        category.setName("shorts");
//        repository.save(category);
//        mvc.perform(get("/api/v1/categories")
//                        .contentType(MediaType.APPLICATION_JSON))
//                        .andExpect(status().isOk())
//                        .andExpect(content()
//                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
//                        .andExpect(jsonPath("$[0].name", is("shorts")));
//
//    }
//
//}
